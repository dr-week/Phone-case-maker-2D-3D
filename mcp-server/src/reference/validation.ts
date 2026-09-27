import path from 'node:path';
import type { DeviceEnvelope, ReferenceCandidate } from './types.js';

export function validateMeasurementRequest(value:unknown, workspaceRoot:string):{device:DeviceEnvelope;candidates:ReferenceCandidate[]}{
  if(!value||typeof value!=='object') throw new Error('JSON body is required');
  const body=value as {device?:DeviceEnvelope;candidates?:ReferenceCandidate[]};
  const d=body.device;
  if(!d||typeof d.model!=='string'||![d.widthMm,d.heightMm,d.depthMm].every(n=>Number.isFinite(n)&&n>0)) throw new Error('Valid device dimensions are required');
  if(!Array.isArray(body.candidates)||!body.candidates.length||body.candidates.length>12) throw new Error('Provide 1 to 12 reference candidates');
  const candidates=body.candidates.map((candidate,index)=>{
    if(!candidate||typeof candidate.id!=='string'||typeof candidate.path!=='string') throw new Error(`Candidate ${index} is invalid`);
    const resolved=path.resolve(workspaceRoot,candidate.path); const allowed=path.resolve(workspaceRoot,'references')+path.sep;
    if(!resolved.startsWith(allowed)) throw new Error('Reference paths must stay inside the workspace references directory');
    return {...candidate,path:resolved};
  });
  return {device:d,candidates};
}
