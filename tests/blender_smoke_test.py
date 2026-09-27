import sys
import importlib.util
from pathlib import Path
import bpy
import bmesh

project = Path(__file__).parents[1]
addon_dir = project / "blender-addon"
spec = importlib.util.spec_from_file_location("caseform_addon", addon_dir / "__init__.py", submodule_search_locations=[str(addon_dir)])
package = importlib.util.module_from_spec(spec)
sys.modules["caseform_addon"] = package
spec.loader.exec_module(package)
from caseform_addon.geometry_builder import build_case

payload = {
    "device": "Samsung Galaxy A73 5G",
    "material": "PLA",
    "wallThickness": 1.6,
    "clearance": 0.35,
    "measurement": {
        "cameraIsland": {"width": 35.0, "height": 43.0, "left": 5.5, "top": 5.5},
        "cameraProtrusion": 1.2,
        "maximumThickness": 8.8,
        "classification": "image-derived",
    },
}
shell = build_case(payload)
meshes = [obj for obj in bpy.data.collections["CaseForm"].objects if obj.type == 'MESH']
assert shell.name.startswith("CaseForm_A73"), shell.name
assert len(meshes) == 5, f"Expected shell plus four ridges, got {len(meshes)}"
assert shell["caseform_camera_width_mm"] == 35.0
assert shell["caseform_camera_height_mm"] == 43.0
assert shell["caseform_camera_protrusion_mm"] == 1.2
assert shell["caseform_measurement_class"] == "image-derived"
for obj in meshes:
    mesh = bmesh.new()
    mesh.from_mesh(obj.data)
    non_manifold = [edge for edge in mesh.edges if not edge.is_manifold]
    assert not non_manifold, f"{obj.name} has {len(non_manifold)} non-manifold edges"
    mesh.free()
print(f"CASEFORM_SMOKE_OK objects={len(meshes)} shell_vertices={len(shell.data.vertices)}")
