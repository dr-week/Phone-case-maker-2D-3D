import bpy
from . import socket_server

class CASEFORM_PT_bridge(bpy.types.Panel):
    bl_label = "CaseForm"
    bl_idname = "CASEFORM_PT_bridge"
    bl_space_type = 'VIEW_3D'
    bl_region_type = 'UI'
    bl_category = "CaseForm"

    def draw(self, context):
        layout = self.layout
        row = layout.row()
        row.label(text="Connected" if socket_server.is_running() else "Disconnected", icon='CHECKMARK' if socket_server.is_running() else 'ERROR')
        layout.label(text="Listening on 127.0.0.1:9025")
        layout.operator("caseform.restart_bridge", icon='FILE_REFRESH')

def register():
    bpy.utils.register_class(CASEFORM_PT_bridge)

def unregister():
    bpy.utils.unregister_class(CASEFORM_PT_bridge)
