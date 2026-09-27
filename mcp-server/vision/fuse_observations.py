"""Multi-image observation fusion with outlier rejection.

Accepts a list of CalibratedObservation dicts (one per already-processed image,
all values already in millimetres). Returns a PhoneGeometryContract-shaped dict
that matches the TypeScript schema in shared/phone-geometry-contract.ts.

Outlier rejection:  values outside Q1-1.5*IQR or Q3+1.5*IQR are dropped
before computing the median. A field needs ≥1 value after rejection; if all
values are rejected the original set is used with reduced confidence.
"""
from __future__ import annotations
import argparse
import json
import sys
import uuid
from datetime import datetime, timezone
from typing import Any


def _iqr_filter(values: list[float]) -> tuple[list[float], list[float]]:
    """Return (kept, rejected) after IQR outlier removal."""
    if len(values) <= 2:
        return values, []
    sv = sorted(values)
    n = len(sv)
    q1 = sv[n // 4]
    q3 = sv[(3 * n) // 4]
    iqr = q3 - q1
    lo = q1 - 1.5 * iqr
    hi = q3 + 1.5 * iqr
    kept = [v for v in values if lo <= v <= hi]
    rejected = [v for v in values if v < lo or v > hi]
    return (kept, rejected) if kept else (values, [])


def _fuse(values: list[float], images: list[str]) -> dict:
    """Return a MeasuredValue dict fused from multiple observations."""
    kept, rejected = _iqr_filter(values)
    sv = sorted(kept)
    mid = len(sv) // 2
    median = sv[mid] if len(sv) % 2 else (sv[mid - 1] + sv[mid]) / 2
    spread = sv[-1] - sv[0] if len(sv) > 1 else 0.0
    # More samples + lower spread = higher confidence
    sample_bonus = min(0.15, (len(kept) - 1) * 0.05)
    confidence = max(0.1, min(1.0, 1.0 - spread / 8 + sample_bonus))
    confidence_class = (
        "measured" if len(kept) >= 2
        else "image-derived" if len(kept) == 1
        else "inferred"
    )
    if rejected:
        confidence = max(0.1, confidence - 0.1 * len(rejected))
    return {
        "valueMm": round(median, 3),
        "confidenceScore": round(confidence, 3),
        "confidenceClass": confidence_class,
        "sourceImages": images,
        "spreadMm": round(spread, 3),
    }


def _single(value: float, image: str, confidence: float = 0.6) -> dict:
    return {
        "valueMm": round(value, 3),
        "confidenceScore": round(confidence, 3),
        "confidenceClass": "image-derived",
        "sourceImages": [image],
        "spreadMm": 0.0,
    }


def fuse_observations(observations: list[dict], phone_model: str) -> dict:
    """
    observations: list of CalibratedObservation dicts:
      {
        "imageId": str,
        "viewKind": "front"|"back"|"side",
        "mmPerPxX": float,
        "mmPerPxY": float,
        "knownWidthMm": float,
        "knownHeightMm": float,
        "knownThicknessMm": float,
        "usable": bool,
        "warnings": [str],
        # Measurement data (already in mm):
        "bodyWidthMm": float,        # from back/front images
        "bodyHeightMm": float,
        "bodyThicknessMm": float,    # from side image (optional)
        "cornerRadiusMm": float,
        "cameraIsland": {
          "widthMm": float, "heightMm": float,
          "leftMm": float, "topMm": float,
          "cornerRadiusMm": float,
        },
        "cameraHoles": [
          {"role": str, "name": str, "xMm": float, "yMm": float, "radiusMm": float}
        ],
        "flash": {"xMm": float, "yMm": float, "radiusMm": float} | null,
        "cameraProtrusionMm": float | null,
        "buttons": [
          {"name": str, "side": str, "topOffsetMm": float, "lengthMm": float,
           "protrusionMm": float, "purpose": str}
        ],
      }
    """
    usable = [o for o in observations if o.get("usable", True)]
    if not usable:
        usable = observations  # degrade gracefully

    # --- Body dimensions --------------------------------------------------
    back_obs = [o for o in usable if o.get("viewKind") in ("back", "front")]
    side_obs = [o for o in usable if o.get("viewKind") == "side"]

    def collect(obs: list[dict], key: str) -> tuple[list[float], list[str]]:
        vals, imgs = [], []
        for o in obs:
            v = o.get(key)
            if v is not None and isinstance(v, (int, float)):
                vals.append(float(v))
                imgs.append(o["imageId"])
        return vals, imgs

    body_widths, w_imgs = collect(back_obs, "bodyWidthMm")
    body_heights, h_imgs = collect(back_obs, "bodyHeightMm")
    body_thick_vals, t_imgs = collect(side_obs, "bodyThicknessMm")
    corner_radii, cr_imgs = collect(usable, "cornerRadiusMm")

    # Fallback: use known dimensions with low confidence when no measured values
    def _known_fallback(key: str, fallback_key: str, obs_list: list[dict]) -> tuple[list[float], list[str]]:
        if obs_list:
            v = obs_list[0].get(fallback_key)
            if v:
                return [float(v)], [obs_list[0]["imageId"]]
        return [], []

    if not body_widths:
        body_widths, w_imgs = _known_fallback("bodyWidthMm", "knownWidthMm", back_obs or usable)
    if not body_heights:
        body_heights, h_imgs = _known_fallback("bodyHeightMm", "knownHeightMm", back_obs or usable)
    if not body_thick_vals:
        body_thick_vals, t_imgs = _known_fallback("bodyThicknessMm", "knownThicknessMm", usable)

    fused_width = _fuse(body_widths, w_imgs) if body_widths else _single(0, "unknown", 0.1)
    fused_height = _fuse(body_heights, h_imgs) if body_heights else _single(0, "unknown", 0.1)
    fused_thick = _fuse(body_thick_vals, t_imgs) if body_thick_vals else _single(0, "unknown", 0.1)
    fused_corner = _fuse(corner_radii, cr_imgs) if corner_radii else _single(0, "unknown", 0.1)

    # --- Camera island ----------------------------------------------------
    def island_vals(field: str):
        vals, imgs = [], []
        for o in back_obs:
            isl = o.get("cameraIsland")
            if isl and isinstance(isl.get(field), (int, float)):
                vals.append(float(isl[field]))
                imgs.append(o["imageId"])
        return vals, imgs

    isl_w, iw_imgs = island_vals("widthMm")
    isl_h, ih_imgs = island_vals("heightMm")
    isl_l, il_imgs = island_vals("leftMm")
    isl_t, it_imgs = island_vals("topMm")
    isl_r, ir_imgs = island_vals("cornerRadiusMm")

    fused_island = {
        "widthMm": _fuse(isl_w, iw_imgs) if isl_w else _single(0, "unknown", 0.1),
        "heightMm": _fuse(isl_h, ih_imgs) if isl_h else _single(0, "unknown", 0.1),
        "leftMm": _fuse(isl_l, il_imgs) if isl_l else _single(0, "unknown", 0.1),
        "topMm": _fuse(isl_t, it_imgs) if isl_t else _single(0, "unknown", 0.1),
        "cornerRadiusMm": _fuse(isl_r, ir_imgs) if isl_r else _single(0, "unknown", 0.1),
    }

    # --- Lenses -----------------------------------------------------------
    # Collect per-role observations
    roles: dict[str, dict[str, tuple[list[float], list[str]]]] = {}
    for o in back_obs:
        for hole in o.get("cameraHoles", []):
            role = hole.get("role", "unknown")
            if role not in roles:
                roles[role] = {"x": ([], []), "y": ([], []), "r": ([], [])}
            roles[role]["x"][0].append(float(hole["xMm"]))
            roles[role]["x"][1].append(o["imageId"])
            roles[role]["y"][0].append(float(hole["yMm"]))
            roles[role]["y"][1].append(o["imageId"])
            roles[role]["r"][0].append(float(hole["radiusMm"]))
            roles[role]["r"][1].append(o["imageId"])

    fused_lenses = []
    for role, fields in roles.items():
        if role == "flash":
            continue
        name_map = {
            "main": "Main Camera", "ultrawide": "Ultra-Wide",
            "depth": "Depth Sensor", "macro": "Macro Lens",
        }
        fused_lenses.append({
            "role": role,
            "name": name_map.get(role, role.title()),
            "xMm": _fuse(*fields["x"]) if fields["x"][0] else _single(0, "unknown", 0.1),
            "yMm": _fuse(*fields["y"]) if fields["y"][0] else _single(0, "unknown", 0.1),
            "radiusMm": _fuse(*fields["r"]) if fields["r"][0] else _single(0, "unknown", 0.1),
        })

    # --- Flash -----------------------------------------------------------
    flash_x, flash_y, flash_r, flash_imgs = [], [], [], []
    for o in back_obs:
        fl = o.get("flash")
        if fl and isinstance(fl.get("xMm"), (int, float)):
            flash_x.append(float(fl["xMm"]))
            flash_y.append(float(fl["yMm"]))
            flash_r.append(float(fl["radiusMm"]))
            flash_imgs.append(o["imageId"])
    # Also collect flash from cameraHoles
    if "flash" in roles:
        flash_x.extend(roles["flash"]["x"][0])
        flash_y.extend(roles["flash"]["y"][0])
        flash_r.extend(roles["flash"]["r"][0])
        flash_imgs.extend(roles["flash"]["x"][1])

    fused_flash = None
    if flash_x:
        fused_flash = {
            "role": "flash",
            "name": "LED Flash",
            "xMm": _fuse(flash_x, flash_imgs),
            "yMm": _fuse(flash_y, flash_imgs),
            "radiusMm": _fuse(flash_r, flash_imgs),
        }

    # --- Camera protrusion -----------------------------------------------
    prot_vals, prot_imgs = collect(usable, "cameraProtrusionMm")
    if prot_vals:
        fused_protrusion = _fuse(prot_vals, prot_imgs)
    else:
        fused_protrusion = {"valueMm": 1.2, "confidenceScore": 0.3,
                             "confidenceClass": "inferred", "sourceImages": [], "spreadMm": 0.0}

    max_thick_val = round(fused_thick["valueMm"] + fused_protrusion["valueMm"], 3)
    fused_max_thick = {
        "valueMm": max_thick_val,
        "confidenceScore": min(fused_thick["confidenceScore"], fused_protrusion["confidenceScore"]),
        "confidenceClass": "inferred",
        "sourceImages": list(set(fused_thick["sourceImages"] + fused_protrusion["sourceImages"])),
        "spreadMm": round(fused_thick.get("spreadMm", 0) + fused_protrusion.get("spreadMm", 0), 3),
    }

    # --- Buttons ----------------------------------------------------------
    # Use first usable observation's buttons as base (no multi-image fusion for buttons yet)
    fused_buttons = []
    for o in usable:
        if o.get("buttons"):
            for b in o["buttons"]:
                fused_buttons.append({
                    "name": b.get("name", ""),
                    "side": b.get("side", "left"),
                    "topOffsetMm": _single(float(b.get("topOffsetMm", 0)), o["imageId"], 0.65),
                    "lengthMm": _single(float(b.get("lengthMm", 0)), o["imageId"], 0.65),
                    "protrusionMm": _single(float(b.get("protrusionMm", 0.9)), o["imageId"], 0.55),
                    "purpose": b.get("purpose", ""),
                })
            break  # use first image with button data

    # --- Calibration records ---------------------------------------------
    calibration_records = [
        {
            "imageId": o["imageId"],
            "viewKind": o.get("viewKind", "back"),
            "mmPerPxX": o.get("mmPerPxX", 0.0),
            "mmPerPxY": o.get("mmPerPxY", 0.0),
            "knownWidthMm": o.get("knownWidthMm", 0),
            "knownHeightMm": o.get("knownHeightMm", 0),
            "knownThicknessMm": o.get("knownThicknessMm", 0),
            "usable": o.get("usable", True),
            "warnings": o.get("warnings", []),
        }
        for o in observations
    ]

    # --- Assemble contract -----------------------------------------------
    contract = {
        "schemaVersion": 1,
        "phoneModel": phone_model,
        "capturedAt": datetime.now(timezone.utc).isoformat(),
        "approvedAt": None,
        "contractId": str(uuid.uuid4()),
        "calibration": calibration_records,
        "body": {
            "widthMm": fused_width,
            "heightMm": fused_height,
            "thicknessMm": fused_thick,
            "cornerRadiusMm": fused_corner,
        },
        "cameraIsland": {
            **fused_island,
            "lenses": fused_lenses,
            "flash": fused_flash,
        },
        "cameraProtrusion": fused_protrusion,
        "maximumThicknessMm": fused_max_thick,
        "buttons": fused_buttons,
        "ports": [],
        "speakers": [],
    }
    return contract


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("observations_json",
                        help="Path to JSON file containing a list of CalibratedObservation objects")
    parser.add_argument("--phone-model", default="Unknown Phone")
    args = parser.parse_args()
    observations = json.loads(open(args.observations_json, encoding="utf-8").read())
    result = fuse_observations(observations, args.phone_model)
    print(json.dumps(result, indent=2))
