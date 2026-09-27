from .design_rules import CAMERA_ISLAND, PHONE, MIN_CLEARANCE, MIN_WALL, warnings

def validated(payload):
    if payload.get("device") != PHONE["model"]:
        raise ValueError("This add-on currently supports Samsung Galaxy A73 5G only")
    material = payload.get("material", "PLA")
    if material != "PLA":
        raise ValueError("This version supports PLA only")
    wall = float(payload.get("wallThickness", 1.6))
    clearance = float(payload.get("clearance", 0.35))
    if not MIN_WALL <= wall <= 3.0:
        raise ValueError(f"Wall thickness must be between {MIN_WALL:.1f} and 3.0 mm")
    if not MIN_CLEARANCE <= clearance <= 1.0:
        raise ValueError(f"Clearance must be between {MIN_CLEARANCE:.2f} and 1.0 mm")
    issues = warnings(wall, clearance)
    if issues:
        raise ValueError("; ".join(issues))
    measurement = payload.get("measurement") or {}
    camera = measurement.get("cameraIsland") or CAMERA_ISLAND
    camera = {key: float(camera.get(key, CAMERA_ISLAND[key])) for key in ("width", "height", "left", "top")}
    if not 10.0 <= camera["width"] <= 60.0 or not 10.0 <= camera["height"] <= 70.0:
        raise ValueError("Measured camera island is outside safe limits")
    protrusion = measurement.get("cameraProtrusion")
    protrusion = float(protrusion) if protrusion is not None else None
    return {"device": PHONE, "material": material, "wall": wall, "clearance": clearance, "camera": camera, "camera_protrusion": protrusion, "measurement_class": measurement.get("classification", "default")}
