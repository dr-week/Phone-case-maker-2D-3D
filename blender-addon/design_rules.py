"""Pure, testable FDM design rules for the A73 PLA case."""

PHONE = {"model": "Samsung Galaxy A73 5G", "width": 76.1, "height": 163.7, "depth": 7.6}
NOZZLE = 0.4
MIN_WALL = 1.2
DEFAULT_WALL = 1.6
MIN_CLEARANCE = 0.30
DEFAULT_CLEARANCE = 0.35
RELIEF_WIDTH = 1.2
RELIEF_LENGTH = 14.0
CAMERA_ISLAND = {"width": 33.2, "height": 48.2, "left": 1.8, "top": 2.3}

def dimensions(wall=DEFAULT_WALL, clearance=DEFAULT_CLEARANCE):
    cavity = (
        PHONE["width"] + clearance * 2,
        PHONE["height"] + clearance * 2,
        PHONE["depth"] + clearance,
    )
    outer = (cavity[0] + wall * 2, cavity[1] + wall * 2, cavity[2] + wall)
    return {"cavity": cavity, "outer": outer}

def extrusion_widths(wall):
    return wall / NOZZLE

def warnings(wall, clearance):
    issues = []
    if wall < MIN_WALL:
        issues.append(f"Wall is below the {MIN_WALL:.1f} mm PLA minimum")
    if clearance < MIN_CLEARANCE:
        issues.append(f"Clearance is below the {MIN_CLEARANCE:.2f} mm starting allowance")
    if abs(extrusion_widths(wall) - round(extrusion_widths(wall))) > 1e-6:
        issues.append("Wall is not an exact multiple of the 0.4 mm nozzle width")
    return issues
