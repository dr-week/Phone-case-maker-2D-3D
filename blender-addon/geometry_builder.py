import bpy
import bmesh
import math
from .validation import validated
from .design_rules import CAMERA_ISLAND, RELIEF_LENGTH, RELIEF_WIDTH, dimensions

COLLECTION = "CaseForm"

def _collection():
    collection = bpy.data.collections.get(COLLECTION)
    if collection is None:
        collection = bpy.data.collections.new(COLLECTION)
        bpy.context.scene.collection.children.link(collection)
    return collection

def _clear(collection):
    for obj in list(collection.objects): bpy.data.objects.remove(obj, do_unlink=True)

def _cube(name, size, location, collection, bevel=0.0):
    if bevel:
        w, h, d = size; radius = min(bevel, w / 2 - 0.001, h / 2 - 0.001); segments = 6
        outline = []
        for cx, cy, start in ((w/2-radius, h/2-radius, 0), (-w/2+radius, h/2-radius, 90), (-w/2+radius, -h/2+radius, 180), (w/2-radius, -h/2+radius, 270)):
            for step in range(segments + 1):
                angle = math.radians(start + 90 * step / segments)
                outline.append((cx + radius * math.cos(angle), cy + radius * math.sin(angle)))
        count = len(outline); vertices = [(x, y, -d/2) for x, y in outline] + [(x, y, d/2) for x, y in outline]
        faces = [tuple(reversed(range(count))), tuple(range(count, count * 2))]
        faces += [(index, (index + 1) % count, (index + 1) % count + count, index + count) for index in range(count)]
        mesh = bpy.data.meshes.new(name + " mesh"); mesh.from_pydata(vertices, [], faces); mesh.update()
        obj = bpy.data.objects.new(name, mesh); obj.location = location; collection.objects.link(obj)
    else:
        bpy.ops.mesh.primitive_cube_add(location=location)
        obj = bpy.context.object; obj.name = name; obj.dimensions = size
        bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
        for owner in list(obj.users_collection): owner.objects.unlink(obj)
        collection.objects.link(obj)
    return obj

def _difference(target, cutter):
    bpy.context.view_layer.objects.active = target; target.select_set(True)
    modifier = target.modifiers.new("CaseForm cutout", 'BOOLEAN'); modifier.operation = 'DIFFERENCE'; modifier.solver = 'EXACT'; modifier.object = cutter
    bpy.ops.object.modifier_apply(modifier=modifier.name)
    bpy.data.objects.remove(cutter, do_unlink=True)

def _clean_mesh(obj):
    mesh = bmesh.new(); mesh.from_mesh(obj.data)
    bmesh.ops.remove_doubles(mesh, verts=mesh.verts, dist=0.001)
    bmesh.ops.dissolve_degenerate(mesh, dist=0.0001, edges=mesh.edges)
    bmesh.ops.recalc_face_normals(mesh, faces=mesh.faces)
    mesh.to_mesh(obj.data); mesh.free(); obj.data.update()

def _pla_material():
    material = bpy.data.materials.get("CaseForm PLA") or bpy.data.materials.new("CaseForm PLA")
    material.diffuse_color = (0.55, 0.82, 0.08, 1.0); material.roughness = 0.48
    return material

def _add_cutouts(shell, dimensions, collection, camera_spec):
    w, h, d = dimensions
    camera_x = -w / 2 + camera_spec["left"] + camera_spec["width"] / 2
    camera_y = h / 2 - camera_spec["top"] - camera_spec["height"] / 2
    camera = _cube("Camera cutout", (camera_spec["width"], camera_spec["height"], d + 5), (camera_x, camera_y, d / 2), collection, min(5.0, camera_spec["width"] / 5)); _difference(shell, camera)
    usb = _cube("USB-C cutout", (13.0, 8.0, 6.0), (0, -h / 2, 4.8), collection, 2.0); _difference(shell, usb)
    speaker = _cube("Speaker cutout", (18.0, 8.0, 4.0), (24.0, -h / 2, 4.0), collection, 1.5); _difference(shell, speaker)
    buttons = _cube("Button relief", (8.0, 32.0, 4.5), (w / 2, 23.0, 5.0), collection, 1.5); _difference(shell, buttons)

def _add_corner_ridges(dimensions, wall, collection, material):
    w, h, d = dimensions
    for index, (x, y) in enumerate(((-1, -1), (-1, 1), (1, -1), (1, 1)), 1):
        ridge = _cube(f"Corner ridge {index}", (wall * 1.8, 17.0, d + wall), (x * (w / 2 - wall * .2), y * (h / 2 - 10.0), (d + wall) / 2), collection, wall * .55)
        ridge.data.materials.append(material)

def _add_insertion_reliefs(shell, dimensions, collection):
    """Give rigid PLA corners room to flex while the phone is inserted."""
    w, h, d = dimensions
    for index, (x, y) in enumerate(((-1, -1), (-1, 1), (1, -1), (1, 1)), 1):
        cutter = _cube(
            f"Insertion relief {index}",
            (RELIEF_WIDTH, RELIEF_LENGTH, d + 3.0),
            (x * (w / 2 - 3.8), y * (h / 2 - RELIEF_LENGTH / 2), d / 2 + 1.0),
            collection,
            RELIEF_WIDTH / 2,
        )
        _difference(shell, cutter)

def build_case(payload):
    config = validated(payload); phone = config["device"]; wall, clearance = config["wall"], config["clearance"]
    calculated = dimensions(wall, clearance); cavity = calculated["cavity"]; outer = calculated["outer"]
    collection = _collection(); _clear(collection); material = _pla_material()
    shell = _cube("CaseForm_A73_PLA_Case", outer, (0, 0, outer[2] / 2), collection, 7.0)
    # The inner radius follows the outer radius minus the wall, avoiding
    # self-intersections at the rounded corners. The cutter starts at the
    # back-wall height and extends above the lip to leave a truly open face.
    void_depth = cavity[2] + 2.0
    void = _cube("Phone cavity", (cavity[0], cavity[1], void_depth), (0, 0, wall + void_depth / 2), collection, max(7.0 - wall, 0.8)); _difference(shell, void)
    _add_cutouts(shell, outer, collection, config["camera"]); _add_insertion_reliefs(shell, outer, collection); _clean_mesh(shell); _add_corner_ridges(outer, wall, collection, material)
    shell.data.materials.append(material); shell["caseform_device"] = phone["model"]; shell["caseform_material"] = config["material"]; shell["caseform_wall_mm"] = wall; shell["caseform_clearance_mm"] = clearance; shell["caseform_camera_width_mm"] = config["camera"]["width"]; shell["caseform_camera_height_mm"] = config["camera"]["height"]; shell["caseform_camera_protrusion_mm"] = config["camera_protrusion"] if config["camera_protrusion"] is not None else -1; shell["caseform_measurement_class"] = config["measurement_class"]
    bpy.context.view_layer.objects.active = shell; shell.select_set(True)
    return shell
