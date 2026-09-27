import bpy
import json
import queue
import socket
import threading
from .geometry_builder import build_case

HOST, PORT = "127.0.0.1", 9025
_queue = queue.Queue()
_server = None
_thread = None
_running = False

def _listen():
    global _server, _running
    try:
        _server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        _server.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        _server.bind((HOST, PORT))
        _server.listen(5)
        _server.settimeout(0.5)
    except OSError as error:
        _running = False
        print(f"CaseForm bridge could not start: {error}")
        return
    while _running:
        try:
            conn, _ = _server.accept()
        except socket.timeout:
            continue
        except OSError:
            break
        with conn:
            for line in conn.makefile():
                try:
                    request = json.loads(line)
                    if request.get("type") == "ping":
                        conn.sendall(b'{"ok":true,"service":"caseform-blender-addon"}\n')
                    else:
                        _queue.put(request)
                        conn.sendall(b'{"ok":true,"queued":true}\n')
                except Exception as error:
                    conn.sendall((json.dumps({"ok": False, "error": str(error)}) + "\n").encode())

def _drain():
    while not _queue.empty():
        request = _queue.get_nowait()
        try:
            build_case(request["parameters"])
        except Exception as error:
            print(f"CaseForm build failed: {error}")
    return 0.1

def is_running():
    return _running

def start_server():
    global _thread, _running
    if _running:
        return
    _running = True
    _thread = threading.Thread(target=_listen, name="CaseFormBridge", daemon=True)
    _thread.start()
    if not bpy.app.timers.is_registered(_drain):
        bpy.app.timers.register(_drain, first_interval=0.1, persistent=True)

def stop_server():
    global _server, _thread, _running
    _running = False
    if _server:
        try:
            _server.close()
        except OSError:
            pass
    _server = None
    _thread = None
    if bpy.app.timers.is_registered(_drain):
        bpy.app.timers.unregister(_drain)

class CASEFORM_OT_restart_bridge(bpy.types.Operator):
    bl_idname = "caseform.restart_bridge"
    bl_label = "Restart Bridge"
    def execute(self, context):
        stop_server()
        start_server()
        self.report({'INFO'}, f"CaseForm listening on {HOST}:{PORT}")
        return {'FINISHED'}

def register():
    bpy.utils.register_class(CASEFORM_OT_restart_bridge)

def unregister():
    bpy.utils.unregister_class(CASEFORM_OT_restart_bridge)
