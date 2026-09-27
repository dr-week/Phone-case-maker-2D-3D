# Phone Case Maker (2D & 3D Parametric CAD Studio)

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF.svg)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg)](https://react.dev/)
[![Three.js](https://img.shields.io/badge/Three.js-r186-black.svg)](https://threejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6.svg)](https://www.typescriptlang.org/)

An advanced web-based parametric CAD studio designed for precision engineering of smartphone back covers, custom replacement backplates, and 3D printable protective cases.

---

## 🌟 Key Features

### 1. Dual Product Design Intent
- **Back Case (Protective Wrap)**: 3D wrap shell with perimeter rims, side button passthroughs (volume/power), bottom USB-C/speaker ports, and front screen retention lips.
- **Back Panel (Replacement Backplate)**: Ultra-thin (0.8–1.2 mm) flush plate engineered for direct chassis frame replacement with adhesive gasket recess and zero side wrap.

### 2. Interactive 2D Orthographic CAD Workspace
- **Photoshop / Canva Style Edge Rulers**: Millimeter-precision persistent top & left outer edge rulers synchronized with canvas pan and zoom coordinates.
- **Infinite Canvas Pan & Zoom**: Smooth mouse wheel zooming (30% to 600%) centered on the pointer, middle-click and Spacebar panning, with persistent zoom HUD controls.
- **Parametric Vector Overlays**: Real-time orthographic views (Front, Side, Top, 3-View projection) with interactive handles for chassis margins, camera islands, lens apertures, and peripheral notches.
- **Layer Stack Manager**: Independent control over grid datum, chassis outline, camera island, apertures, side notches, and dimension callouts.

### 3. Fast Deterministic CAD Decision Engine & Anti-Slop Guard
- **Laya CAD Decision Engine**: Single-pass, non-autoregressive choice routing for aperture patterns, folding net strategies, and fabrication tolerances with zero token waste.
- **Anti-Slop CAD Guard**: Static geometric sanity checker catching negative boundaries, non-manifold corner curvatures, and delamination risks before meshing.

### 4. Real-Time 3D Mesh Engine & Flat Pattern Unfolder
- **Three.js Parametric Mesh Generation**: Instant extrusion of watertight geometries with customizable filament simulation (Neon PLA, Carbon Fiber, TPU, Frosted Resin).
- **Living Hinge Flat Sheet Unfolder**: Parametrically flattens 3D case enclosures into 2D laser-cuttable sheet patterns featuring dashed living hinge relief slits.
- **Blender Bridge MCP Server**: Direct IPC socket sync between browser CAD coordinates and local Blender sessions.

### 5. Verified Device Database & Caliper Measurement Tools
- Pre-loaded with popular global and Indian smartphone specifications (Xiaomi 11i HyperCharge, Samsung Galaxy A73, OnePlus, iPhone, Nothing Phone, etc.).
- Integrated custom device caliper input modal for rapid custom prototyping.

---

## 🏗️ Architecture & Project Structure

```
PHONEcase/
├── src/
│   ├── features/
│   │   ├── 2d-design/           # Orthographic CAD, canvas rulers, layer manager, and Laya router
│   │   │   ├── rulers/          # Edge rulers and viewport transformation controller
│   │   │   ├── cad_cover_types.ts
│   │   │   ├── InteractiveBackCoverSvg.tsx
│   │   │   ├── Design2dWorkspace.tsx
│   │   │   ├── BackCoverParamEditor.tsx
│   │   │   ├── laya_cad_decision_router.ts
│   │   │   └── anti_slop_cad_guard.ts
│   │   ├── 3d-engine/           # Three.js geometry builders, flat unfolding, and materials
│   │   │   ├── case_geometry_builder.ts
│   │   │   ├── flat_pattern_builder.ts
│   │   │   └── case_3d_orchestrator.ts
│   │   ├── device-library/      # Smartphone spec database and custom device intake
│   │   ├── launcher/            # Splash overlay, animations, and Laya assistant
│   │   └── navigation/          # Workflow step navigation and sidebar
│   ├── store/
│   │   └── useCadStore.ts       # Global Zustand state management
│   ├── blenderBridge.ts         # Blender WebSocket / TCP bridge
│   ├── main.tsx                 # Application entry point
│   └── status.css               # Design system and CAD UI styling
├── mcp-server/                  # Model Context Protocol server for bridge and vision tests
├── blender-addon/               # Python addon for Blender mesh generation
└── scripts/                     # Local development scripts
```

---

## 🚀 Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `pnpm`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/dr-week/Phone-case-maker-2D-3D.git
   cd Phone-case-maker-2D-3D
   ```

2. **Install frontend dependencies**:
   ```bash
   npm install
   ```

3. **Install MCP server dependencies** (optional, for test runner & bridge):
   ```bash
   cd mcp-server
   npm install
   cd ..
   ```

### Running Locally

- **Development server**:
  ```bash
  npm run dev
  ```
  Open [http://localhost:5173](http://localhost:5173) in your browser.

- **Production build**:
  ```bash
  npm run build
  ```

- **Run test suites**:
  ```bash
  npm --prefix mcp-server test
  ```

---

## 🖨️ 3D Printing & Fabrication Guidelines

- **Wall Thickness**: Standard protective cases use 1.6–2.0 mm walls. Back panels should be printed or milled between 0.9–1.2 mm.
- **Clearance**: Minimum 0.35 mm clearance around the phone frame is recommended for snap-fit rigid filaments (PLA/PETG), and 0.20 mm for flexible TPU.
- **Shrinkage Compensation**: Camera lens cutouts include automatic radial dilation (+1.4 to 1.8 mm) to offset material contraction during cooling.

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
