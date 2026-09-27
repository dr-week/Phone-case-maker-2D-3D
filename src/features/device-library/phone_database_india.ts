import type { BackCoverDesignParams } from '../2d-design/cad_cover_types';

export interface BackPanelReplacementInfo {
  isAvailableOnline: boolean;
  marketPriceEstimateInr: number;
  material: 'Aluminosilicate 2.5D Glass' | 'PMMA/PC Composite' | 'Ceramic' | 'Matte AG Glass';
  adhesivePreCutAvailable: boolean;
  supplierOrigin: 'OEM Service Centers' | 'Shenzhen / Guangdong Suppliers' | 'Local Indian Repair Markets';
  difficultyRating: 'Easy (Heat & Spudger)' | 'Moderate (Camera Bracket Transfer)' | 'Advanced (NFC Coil Separation)';
}

export interface PhoneModelRecord {
  id: string;
  brand: string;
  model: string;
  market: 'India' | 'Global' | 'Custom';
  dimensions: {
    widthMm: number;
    heightMm: number;
    thicknessMm: number;
    cornerCurvatureMm: number;
  };
  backCoverDefault: BackCoverDesignParams;
  specsSummary: string;
  isPopularInIndia: boolean;
  backPanelReplacement?: BackPanelReplacementInfo;
  isCustomDevice?: boolean;
}

export const INDIA_PHONE_DATABASE: PhoneModelRecord[] = [
  {
    id: 'xiaomi-11i-hypercharge',
    brand: 'Xiaomi',
    model: 'Xiaomi 11i HyperCharge 5G (Mi 11 Hypercharge)',
    market: 'India',
    specsSummary: '120W HyperCharge · Dimensity 920 · 108MP Quad Cam · 163.7 × 76.2 × 8.3 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 76.2,
      heightMm: 163.7,
      thicknessMm: 8.3,
      cornerCurvatureMm: 8.0
    },
    backCoverDefault: {
      coverWidthMm: 76.2,
      coverHeightMm: 163.7,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 8.0,
      bumpWidthMm: 35.0,
      bumpHeightMm: 58.0,
      bumpLeftMarginMm: 4.8,
      bumpTopMarginMm: 5.2,
      bumpDepthMm: 2.4,
      bumpCornerRadiusMm: 6.5,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 28.0,
      cameraOpeningHeightMm: 48.0,
      cameraOpeningLeftOffsetMm: 3.5,
      cameraOpeningTopOffsetMm: 4.5,
      cameraOpeningRadiusMm: 5.0,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 850,
      material: 'Matte AG Glass',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Shenzhen / Guangdong Suppliers',
      difficultyRating: 'Easy (Heat & Spudger)'
    }
  },
  {
    id: 'samsung-galaxy-a73',
    brand: 'Samsung',
    model: 'Samsung Galaxy A73 5G',
    market: 'India',
    specsSummary: 'SM-A736B · 108MP OIS · Snapdragon 778G · 163.7 × 76.1 × 7.6 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 76.1,
      heightMm: 163.7,
      thicknessMm: 7.6,
      cornerCurvatureMm: 8.5
    },
    backCoverDefault: {
      coverWidthMm: 76.1,
      coverHeightMm: 163.7,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 8.5,
      bumpWidthMm: 38.0,
      bumpHeightMm: 62.0,
      bumpLeftMarginMm: 4.5,
      bumpTopMarginMm: 5.5,
      bumpDepthMm: 2.1,
      bumpCornerRadiusMm: 7.0,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 30.0,
      cameraOpeningHeightMm: 52.0,
      cameraOpeningLeftOffsetMm: 4.0,
      cameraOpeningTopOffsetMm: 5.0,
      cameraOpeningRadiusMm: 5.5,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 950,
      material: 'PMMA/PC Composite',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'OEM Service Centers',
      difficultyRating: 'Moderate (Camera Bracket Transfer)'
    }
  },
  {
    id: 'redmi-note-12-pro-plus',
    brand: 'Xiaomi / Redmi',
    model: 'Redmi Note 12 Pro+ 5G',
    market: 'India',
    specsSummary: '200MP HPX Sensor · 120W Hypercharge · 162.9 × 76.0 × 8.9 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 76.0,
      heightMm: 162.9,
      thicknessMm: 8.9,
      cornerCurvatureMm: 8.2
    },
    backCoverDefault: {
      coverWidthMm: 76.0,
      coverHeightMm: 162.9,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 8.2,
      bumpWidthMm: 36.5,
      bumpHeightMm: 54.0,
      bumpLeftMarginMm: 4.8,
      bumpTopMarginMm: 6.0,
      bumpDepthMm: 3.1,
      bumpCornerRadiusMm: 6.5,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 29.0,
      cameraOpeningHeightMm: 44.0,
      cameraOpeningLeftOffsetMm: 3.5,
      cameraOpeningTopOffsetMm: 5.0,
      cameraOpeningRadiusMm: 5.0,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 799,
      material: 'Aluminosilicate 2.5D Glass',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Shenzhen / Guangdong Suppliers',
      difficultyRating: 'Easy (Heat & Spudger)'
    }
  },
  {
    id: 'oneplus-11r',
    brand: 'OnePlus',
    model: 'OnePlus 11R 5G',
    market: 'India',
    specsSummary: 'CPH2487 · 100W SuperVOOC · Circular Camera Island · 163.4 × 74.3 × 8.7 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 74.3,
      heightMm: 163.4,
      thicknessMm: 8.7,
      cornerCurvatureMm: 7.5
    },
    backCoverDefault: {
      coverWidthMm: 74.3,
      coverHeightMm: 163.4,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 7.5,
      bumpWidthMm: 52.0,
      bumpHeightMm: 52.0,
      bumpLeftMarginMm: 3.5,
      bumpTopMarginMm: 8.0,
      bumpDepthMm: 2.8,
      bumpCornerRadiusMm: 26.0,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 44.0,
      cameraOpeningHeightMm: 44.0,
      cameraOpeningLeftOffsetMm: 4.0,
      cameraOpeningTopOffsetMm: 4.0,
      cameraOpeningRadiusMm: 22.0,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 1250,
      material: 'Aluminosilicate 2.5D Glass',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Shenzhen / Guangdong Suppliers',
      difficultyRating: 'Moderate (Camera Bracket Transfer)'
    }
  },
  {
    id: 'realme-11-pro-plus',
    brand: 'Realme',
    model: 'Realme 11 Pro+ 5G',
    market: 'India',
    specsSummary: '200MP OIS · Vegan Leather / Curved Matrix · 161.6 × 73.9 × 8.2 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 73.9,
      heightMm: 161.6,
      thicknessMm: 8.2,
      cornerCurvatureMm: 9.0
    },
    backCoverDefault: {
      coverWidthMm: 73.9,
      coverHeightMm: 161.6,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 9.0,
      bumpWidthMm: 54.0,
      bumpHeightMm: 54.0,
      bumpLeftMarginMm: 10.0,
      bumpTopMarginMm: 8.5,
      bumpDepthMm: 3.2,
      bumpCornerRadiusMm: 27.0,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 46.0,
      cameraOpeningHeightMm: 46.0,
      cameraOpeningLeftOffsetMm: 4.0,
      cameraOpeningTopOffsetMm: 4.0,
      cameraOpeningRadiusMm: 23.0,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 900,
      material: 'PMMA/PC Composite',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Local Indian Repair Markets',
      difficultyRating: 'Easy (Heat & Spudger)'
    }
  },
  {
    id: 'iphone-14-pro-max',
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    market: 'India',
    specsSummary: 'A2894 · Ceramic Shield · 48MP Triple Cam · 160.7 × 77.6 × 7.85 mm',
    isPopularInIndia: true,
    dimensions: {
      widthMm: 77.6,
      heightMm: 160.7,
      thicknessMm: 7.85,
      cornerCurvatureMm: 9.0
    },
    backCoverDefault: {
      coverWidthMm: 77.6,
      coverHeightMm: 160.7,
      coverThicknessMm: 1.8,
      cornerCurvatureMm: 9.0,
      bumpWidthMm: 40.0,
      bumpHeightMm: 40.0,
      bumpLeftMarginMm: 4.5,
      bumpTopMarginMm: 4.5,
      bumpDepthMm: 4.18,
      bumpCornerRadiusMm: 8.0,
      bumpWallThicknessMm: 1.8,
      cameraOpeningWidthMm: 34.0,
      cameraOpeningHeightMm: 34.0,
      cameraOpeningLeftOffsetMm: 3.0,
      cameraOpeningTopOffsetMm: 3.0,
      cameraOpeningRadiusMm: 6.5,
      cameraOpeningRimMm: 1.2
    },
    backPanelReplacement: {
      isAvailableOnline: true,
      marketPriceEstimateInr: 2400,
      material: 'Matte AG Glass',
      adhesivePreCutAvailable: true,
      supplierOrigin: 'Shenzhen / Guangdong Suppliers',
      difficultyRating: 'Advanced (NFC Coil Separation)'
    }
  }
];

export const DEFAULT_FAVORITE_IDS = ['xiaomi-11i-hypercharge', 'samsung-galaxy-a73'];
