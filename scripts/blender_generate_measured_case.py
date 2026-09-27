import argparse
import importlib.util
import json
import sys
from pathlib import Path
import bpy
import bmesh

parser = argparse.ArgumentParser()
parser.add_argument("--analysis", required=True)
parser.add_argument("--output", required=True)
args, _ = parser.parse_known_args(sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else [])

root = Path(__file__).parents[1]
addon_dir = root / "blender-addon"
spec = importlib.util.spec_from_file_location("caseform_addon", addon_dir / "__init__.py", submodule_search_locations=[str(addon_dir)])
package = importlib.util.module_from_spec(spec)
sys.modules["caseform_addon"] = package
spec.loader.exec_module(package)
from caseform_addon.geometry_builder import build_case

analysis = json.loads(Path(args.analysis).read_text(encoding="utf-8"))
if not analysis["generationPolicy"]["prototypeAllowed"]:
    raise RuntimeError("Recognition policy did not approve prototype generation")
geometry = analysis["geometry"]
payload = {
    "device": analysis["device"]["model"],
    "material": "PLA",
    "wallThickness": 1.6,
    "clearance": 0.35,
    "measurement": {
        "cameraIsland": {
            "width": geometry["cameraIsland"]["widthMm"],
            "height": geometry["cameraIsland"]["heightMm"],
            "left": geometry["cameraIsland"]["leftMm"],
            "top": geometry["cameraIsland"]["topMm"],
        },
        "cameraProtrusion": geometry["cameraProtrusion"]["valueMm"],
        "maximumThickness": geometry["maximumThicknessMm"],
        "classification": geometry["cameraIsland"]["classification"],
    },
}
shell = build_case(payload)
meshes = [obj for obj in bpy.data.collections["CaseForm"].objects if obj.type == "MESH"]
for obj in meshes:
    mesh = bmesh.new()
    mesh.from_mesh(obj.data)
    non_manifold = [edge for edge in mesh.edges if not edge.is_manifold]
    mesh.free()
    if non_manifold:
        raise RuntimeError(f"{obj.name} has {len(non_manifold)} non-manifold edges")

output = Path(args.output)
output.parent.mkdir(parents=True, exist_ok=True)
bpy.ops.wm.save_as_mainfile(filepath=str(output))
report = {
    "blendFile": str(output),
    "device": payload["device"],
    "objects": len(meshes),
    "shellVertices": len(shell.data.vertices),
    "outerDimensionsMm": [round(value, 3) for value in shell.dimensions],
    "cameraIslandMm": [shell["caseform_camera_width_mm"], shell["caseform_camera_height_mm"]],
    "cameraProtrusionMm": shell["caseform_camera_protrusion_mm"],
    "measurementClass": shell["caseform_measurement_class"],
    "manifold": True,
}
report_path = output.with_suffix(".report.json")
report_path.write_text(json.dumps(report, indent=2), encoding="utf-8")
print("CASEFORM_GENERATED " + json.dumps(report))
