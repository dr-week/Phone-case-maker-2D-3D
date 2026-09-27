import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export type ViewOrientationPreset = 'perspective' | 'front' | 'back' | 'left' | 'bottom' | 'reset';

export interface ViewportControllerConfig {
  container: HTMLDivElement;
  onInit?: () => void;
}

export class ThreeViewportController {
  private container: HTMLDivElement;
  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;
  private renderer: THREE.WebGLRenderer;
  private controls: OrbitControls;
  private observer: ResizeObserver;
  private animId: number = 0;
  private isDisposed: boolean = false;
  private focusPoint = new THREE.Vector3(0, 0, 0);

  constructor(config: ViewportControllerConfig) {
    this.container = config.container;
    this.scene = new THREE.Scene();

    // Camera
    this.camera = new THREE.PerspectiveCamera(34, 1, 0.1, 1000);
    this.camera.position.set(105, -72, 360);

    // Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.container.appendChild(this.renderer.domElement);

    // Controls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.07;
    this.controls.enablePan = false;
    this.controls.minDistance = 200;
    this.controls.maxDistance = 800;
    this.controls.target.copy(this.focusPoint);
    this.controls.update();
    this.controls.saveState();

    // Studio Lighting
    this.setupLighting();

    // Studio Grid
    const grid = new THREE.GridHelper(440, 28, 0x344039, 0x202724);
    grid.rotation.x = Math.PI / 2;
    grid.position.z = -10;
    this.scene.add(grid);

    // Resize handling
    this.observer = new ResizeObserver(() => this.resize());
    this.observer.observe(this.container);
    this.resize();

    // Render loop
    this.startLoop();
  }

  private setupLighting(): void {
    const ambient = new THREE.HemisphereLight(0xddeeff, 0x12180d, 2.5);
    this.scene.add(ambient);

    const key = new THREE.DirectionalLight(0xffffff, 4.5);
    key.position.set(90, -110, 180);
    this.scene.add(key);

    const fill = new THREE.DirectionalLight(0x88ccff, 1.8);
    fill.position.set(-100, -80, -120);
    this.scene.add(fill);

    const rim = new THREE.DirectionalLight(0xbfff35, 3.2);
    rim.position.set(-120, 80, 70);
    this.scene.add(rim);
  }

  public getScene(): THREE.Scene {
    return this.scene;
  }

  public setView(preset: ViewOrientationPreset): void {
    switch (preset) {
      case 'perspective':
        this.animateCameraTo([105, -72, 360], 34);
        break;
      case 'front':
        this.animateCameraTo([0, 0, -790], 12);
        break;
      case 'back':
        this.animateCameraTo([0, 0, 790], 12);
        break;
      case 'left':
        this.animateCameraTo([-790, 0, 0], 12);
        break;
      case 'bottom':
        this.animateCameraTo([0, -790, 0], 12);
        break;
      case 'reset':
      default:
        this.controls.reset();
        break;
    }
  }

  private animateCameraTo(pos: [number, number, number], fov: number): void {
    this.camera.fov = fov;
    this.camera.updateProjectionMatrix();
    this.camera.position.set(...pos);
    this.camera.lookAt(this.focusPoint);
    this.controls.target.copy(this.focusPoint);
    this.controls.update();
  }

  private resize(): void {
    if (this.isDisposed) return;
    const width = Math.max(this.container.clientWidth, 1);
    const height = Math.max(this.container.clientHeight, 1);
    this.renderer.setSize(width, height, false);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  private startLoop(): void {
    const tick = () => {
      if (this.isDisposed) return;
      this.controls.update();
      this.renderer.render(this.scene, this.camera);
      this.animId = requestAnimationFrame(tick);
    };
    this.animId = requestAnimationFrame(tick);
  }

  public dispose(): void {
    this.isDisposed = true;
    cancelAnimationFrame(this.animId);
    this.observer.disconnect();
    this.controls.dispose();
    this.renderer.dispose();
    if (this.container.contains(this.renderer.domElement)) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
