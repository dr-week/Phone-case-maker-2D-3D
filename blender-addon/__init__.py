bl_info = {
    "name": "CaseForm Live Bridge",
    "author": "CaseForm",
    "version": (1, 0, 0),
    "blender": (3, 6, 0),
    "location": "3D Viewport > Sidebar > CaseForm",
    "description": "Receive and build Samsung Galaxy A73 5G cases from CaseForm",
    "category": "Object",
}

from . import socket_server, ui

def register():
    socket_server.register()
    ui.register()
    socket_server.start_server()

def unregister():
    socket_server.stop_server()
    ui.unregister()
    socket_server.unregister()
