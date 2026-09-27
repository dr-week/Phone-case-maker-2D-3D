import * as THREE from 'three';

export type CaseFilamentType = 'neon-pla' | 'matte-black' | 'frost-tpu' | 'cyber-orange';

export interface PhoneMaterials {
  frame: THREE.MeshPhysicalMaterial;
  back: THREE.MeshPhysicalMaterial;
  screen: THREE.MeshPhysicalMaterial;
  lensBezel: THREE.MeshPhysicalMaterial;
  lensGlass: THREE.MeshPhysicalMaterial;
  flashLed: THREE.MeshStandardMaterial;
  button: THREE.MeshPhysicalMaterial;
  island: THREE.MeshPhysicalMaterial;
}

export function createPhoneMaterials(): PhoneMaterials {
  return {
    frame: new THREE.MeshPhysicalMaterial({
      color: 0x5a5e62,
      roughness: 0.32,
      metalness: 0.75,
      clearcoat: 0.3
    }),
    back: new THREE.MeshPhysicalMaterial({
      color: 0x2e3234,
      roughness: 0.44,
      metalness: 0.18,
      clearcoat: 0.22
    }),
    island: new THREE.MeshPhysicalMaterial({
      color: 0x292d2f,
      roughness: 0.42,
      metalness: 0.25,
      clearcoat: 0.3
    }),
    screen: new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.08,
      metalness: 0.1,
      clearcoat: 0.95
    }),
    lensBezel: new THREE.MeshPhysicalMaterial({
      color: 0x181a1c,
      roughness: 0.2,
      metalness: 0.88,
      clearcoat: 0.4
    }),
    lensGlass: new THREE.MeshPhysicalMaterial({
      color: 0x020406,
      roughness: 0.06,
      metalness: 0.7,
      clearcoat: 1.0
    }),
    flashLed: new THREE.MeshStandardMaterial({
      color: 0xfff4d0,
      emissive: 0xffdf80,
      emissiveIntensity: 0.65
    }),
    button: new THREE.MeshPhysicalMaterial({
      color: 0x52565a,
      roughness: 0.28,
      metalness: 0.8
    })
  };
}

export function createCaseMaterial(filament: CaseFilamentType = 'neon-pla'): THREE.MeshPhysicalMaterial {
  switch (filament) {
    case 'matte-black':
      return new THREE.MeshPhysicalMaterial({
        color: 0x1a1c1e,
        roughness: 0.75,
        metalness: 0.05,
        clearcoat: 0.08,
        side: THREE.DoubleSide
      });
    case 'frost-tpu':
      return new THREE.MeshPhysicalMaterial({
        color: 0xdae6ee,
        roughness: 0.28,
        metalness: 0.02,
        transparent: true,
        opacity: 0.78,
        side: THREE.DoubleSide,
        depthWrite: false
      });
    case 'cyber-orange':
      return new THREE.MeshPhysicalMaterial({
        color: 0xff6622,
        roughness: 0.38,
        metalness: 0.05,
        clearcoat: 0.3,
        side: THREE.DoubleSide
      });
    case 'neon-pla':
    default:
      return new THREE.MeshPhysicalMaterial({
        color: 0xb8ef2d,
        roughness: 0.42,
        metalness: 0.02,
        clearcoat: 0.25,
        transparent: true,
        opacity: 0.82,
        side: THREE.DoubleSide,
        depthWrite: false
      });
  }
}

export function disposeMaterialGroup(materials: Record<string, THREE.Material | THREE.Material[]>): void {
  Object.values(materials).forEach(item => {
    if (Array.isArray(item)) {
      item.forEach(m => m.dispose());
    } else if (item && typeof item.dispose === 'function') {
      item.dispose();
    }
  });
}
