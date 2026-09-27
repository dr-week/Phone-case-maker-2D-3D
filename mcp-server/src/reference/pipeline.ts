import { analyzeCandidate } from './image-analysis.js';
import type { DeviceEnvelope, MeasurementResult, Rect, ReferenceCandidate } from './types.js';

const median=(values:number[])=>{const sorted=[...values].sort((a,b)=>a-b);const middle=Math.floor(sorted.length/2);return sorted.length%2?sorted[middle]:(sorted[middle-1]+sorted[middle])/2;};
const rectMedian=(rects:Rect[]):Rect=>({x:median(rects.map(r=>r.x)),y:median(rects.map(r=>r.y)),width:median(rects.map(r=>r.width)),height:median(rects.map(r=>r.height))});
const rectSpread=(rects:Rect[],center:Rect):Rect=>({x:Math.max(...rects.map(r=>Math.abs(r.x-center.x))),y:Math.max(...rects.map(r=>Math.abs(r.y-center.y))),width:Math.max(...rects.map(r=>Math.abs(r.width-center.width))),height:Math.max(...rects.map(r=>Math.abs(r.height-center.height)))});

export async function measureReferences(device:DeviceEnvelope,candidates:ReferenceCandidate[]):Promise<MeasurementResult>{
  if(!candidates.length) throw new Error('At least one reference candidate is required');
  const analyses=await Promise.all(candidates.map(candidate=>analyzeCandidate(candidate,device)));
  const selected=analyses.filter(item=>item.accepted).sort((a,b)=>b.score-a.score);
  const cameraRects=selected.flatMap(item=>item.cameraIslandMm?[item.cameraIslandMm]:[]);
  const result:MeasurementResult={schemaVersion:1,device,candidates:analyses,selectedCandidateIds:selected.map(item=>item.id),printReady:false,requiredReview:['Confirm phone silhouette','Confirm camera-island boundary','Supply or measure camera protrusion','Verify ports, buttons, microphones and speaker']};
  if(cameraRects.length){
    const center=rectMedian(cameraRects); const spread=rectSpread(cameraRects,center);
    const normalizedSpread=Math.max(spread.x,spread.y,spread.width,spread.height)/Math.max(center.width,center.height);
    result.cameraIsland={rectMm:center,spreadMm:spread,confidence:+Math.max(.35,Math.min(.9,.84-normalizedSpread)).toFixed(2),classification:'image-derived'};
  }
  return result;
}
