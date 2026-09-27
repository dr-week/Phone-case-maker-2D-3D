"""CaseForge Blender receiver.

Run inside Blender's scripting workspace. The MCP bridge sends newline-delimited
JSON to localhost:9025. Geometry generation is intentionally isolated here so
the same React parameters can later drive a more detailed CAD pipeline.
"""
import bpy
import json
import socket
import threading

HOST, PORT = "127.0.0.1", 9025

def clear_caseforge():
    for obj in list(bpy.data.objects):
        if obj.name.startswith("CaseForge"):
            bpy.data.objects.remove(obj, do_unlink=True)

def add_block(name, size, location):
    bpy.ops.mesh.primitive_cube_add(location=location)
    obj = bpy.context.object
    obj.name = f"CaseForge_{name}"
    obj.dimensions = size
    bpy.ops.object.transform_apply(location=False, rotation=False, scale=True)
    return obj

def generate_case(params):
    clear_caseforge()
    phone = params["phone"]
    lining = params["velvetThickness"] * 2
    margin = params["safetyMargin"]
    cavity = (phone["width"] + lining + margin, phone["height"] + lining + margin, phone["depth"] + lining + margin)
    wall = params["wallThickness"]
    # Phase 1: a five-piece rigid shell. Corner relief cuts and hinge bodies
    # are the next geometry pass, kept separate for easier print validation.
    w, h, d = cavity
    add_block("Backplate", (w + 2*wall, h + 2*wall, wall), (0, 0, wall/2))
    add_block("LeftWall", (wall, h + 2*wall, d), (-(w + wall)/2, 0, d/2))
    add_block("RightWall", (wall, h + 2*wall, d), ((w + wall)/2, 0, d/2))
    add_block("TopWall", (w, wall, d), (0, (h + wall)/2, d/2))
    add_block("BottomWall", (w, wall, d), (0, -(h + wall)/2, d/2))

def serve():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    server.bind((HOST, PORT)); server.listen(1)
    print(f"CaseForge Blender receiver listening on {HOST}:{PORT}")
    while True:
        conn, _ = server.accept()
        with conn:
            for line in conn.makefile():
                try:
                    request = json.loads(line)
                    generate_case(request["parameters"])
                    conn.sendall(b'{"ok":true}\n')
                except Exception as error:
                    conn.sendall((json.dumps({"ok": False, "error": str(error)}) + "\n").encode())

threading.Thread(target=serve, daemon=True).start()
