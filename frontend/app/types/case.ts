export interface PhoneDimensions { width: number; height: number; depth: number }
export interface CasePayload { device: string; dimensions: PhoneDimensions; tolerances: { velvetThickness: number; safetyMargin: number; shrinkCompensation: number }; cornerSlits: { enabled: boolean; width: number; reliefRadius: number; depthFromLip: number }; wallThickness: number }
