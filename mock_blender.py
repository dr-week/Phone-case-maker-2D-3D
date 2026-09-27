import json, socket
with socket.socket(socket.AF_INET,socket.SOCK_STREAM) as server:
    server.setsockopt(socket.SOL_SOCKET,socket.SO_REUSEADDR,1);server.bind(('127.0.0.1',9025));server.listen(5);print('Mock Blender listening on 9025',flush=True)
    while True:
        conn,_=server.accept()
        with conn:
            payload=json.loads(conn.recv(65536).decode());print(json.dumps(payload,indent=2),flush=True);conn.sendall(b'{"ok":true,"mock":true}\n')
