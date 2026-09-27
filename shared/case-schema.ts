export type HingeDirection = 'top' | 'bottom';

export type CaseParameters = {
  phone: { model: string; width: number; height: number; depth: number };
  material: 'PLA';
  velvetThickness: number;
  safetyMargin: number;
  wallThickness: number;
  slitWidth: number;
  slitDepthFromLip: number;
  reliefRadius: number;
  hinge?: { direction: HingeDirection; pinDiameter: number; coverGap: number };
};

export function cavityFor(params: CaseParameters) {
  const lining = params.velvetThickness * 2;
  return {
    width: params.phone.width + lining + params.safetyMargin,
    height: params.phone.height + lining + params.safetyMargin,
    depth: params.phone.depth + lining + params.safetyMargin,
  };
}
