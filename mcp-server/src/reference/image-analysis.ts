import sharp from 'sharp';
import type { CandidateAnalysis, DeviceEnvelope, Rect, ReferenceCandidate } from './types.js';

type Component = Rect & { area: number; touchesEdge: boolean };

function colorDistance(a: number[], b: number[]) {
  return Math.sqrt((a[0]-b[0])**2 + (a[1]-b[1])**2 + (a[2]-b[2])**2);
}

function largestComponent(mask: Uint8Array, width: number, height: number): Component | undefined {
  const seen = new Uint8Array(mask.length);
  let best: Component | undefined;
  const stack: number[] = [];
  for (let start = 0; start < mask.length; start++) {
    if (!mask[start] || seen[start]) continue;
    let minX=width, minY=height, maxX=0, maxY=0, area=0, touchesEdge=false;
    stack.push(start); seen[start]=1;
    while (stack.length) {
      const index=stack.pop()!; const x=index%width; const y=Math.floor(index/width);
      minX=Math.min(minX,x); minY=Math.min(minY,y); maxX=Math.max(maxX,x); maxY=Math.max(maxY,y); area++;
      if (x===0||y===0||x===width-1||y===height-1) touchesEdge=true;
      const neighbors=[index-1,index+1,index-width,index+width];
      for (const next of neighbors) {
        if (next<0||next>=mask.length||seen[next]||!mask[next]) continue;
        const nx=next%width;
        if (Math.abs(nx-x)>1) continue;
        seen[next]=1; stack.push(next);
      }
    }
    const component={x:minX,y:minY,width:maxX-minX+1,height:maxY-minY+1,area,touchesEdge};
    if (!best||component.area>best.area) best=component;
  }
  return best;
}

function toMm(rect: Rect, phone: Rect, scale: number): Rect {
  return {
    x: +((rect.x-phone.x)*scale).toFixed(2),
    y: +((rect.y-phone.y)*scale).toFixed(2),
    width: +(rect.width*scale).toFixed(2),
    height: +(rect.height*scale).toFixed(2),
  };
}

function detectCameraIsland(data:Buffer,width:number,channels:number,phone:Rect):Rect|undefined{
  const luminance=(x:number,y:number)=>{const i=(y*width+x)*channels;return .299*data[i]+.587*data[i+1]+.114*data[i+2];};
  const gradient=(x:number,y:number)=>Math.abs(luminance(Math.min(x+1,width-1),y)-luminance(Math.max(x-1,0),y))+Math.abs(luminance(x,y+1)-luminance(x,Math.max(y-1,0)));
  const edgeMean=(rect:Rect)=>{
    let sum=0,count=0; const x0=Math.round(rect.x),x1=Math.round(rect.x+rect.width),y0=Math.round(rect.y),y1=Math.round(rect.y+rect.height);
    for(let x=x0;x<=x1;x+=2){sum+=gradient(x,y0)+gradient(x,y1);count+=2;}
    for(let y=y0;y<=y1;y+=2){sum+=gradient(x0,y)+gradient(x1,y);count+=2;}
    return sum/Math.max(count,1);
  };
  let best:{rect:Rect;energy:number}|undefined;
  const px=(fraction:number,axis:'x'|'y')=>fraction*(axis==='x'?phone.width:phone.height);
  for(let xf=.01;xf<=.12;xf+=.025) for(let wf=.34;wf<=.58;wf+=.035)
    for(let yf=.01;yf<=.10;yf+=.025) for(let hf=.20;hf<=.36;hf+=.025){
      const rect={x:phone.x+px(xf,'x'),y:phone.y+px(yf,'y'),width:px(wf,'x'),height:px(hf,'y')};
      const energy=edgeMean(rect);
      if(!best||energy>best.energy) best={rect,energy};
    }
  return best&&best.energy>=9?best.rect:undefined;
}

export async function analyzeCandidate(candidate: ReferenceCandidate, device: DeviceEnvelope): Promise<CandidateAnalysis> {
  const image=sharp(candidate.path, { failOn: 'warning' }).rotate().ensureAlpha();
  const { data, info }=await image.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels }=info;
  const corners=[[0,0],[width-1,0],[0,height-1],[width-1,height-1]].map(([x,y])=>{
    const i=(y*width+x)*channels; return [data[i],data[i+1],data[i+2]];
  });
  const background=[0,1,2].map(c=>corners.reduce((sum,p)=>sum+p[c],0)/4);
  const mask=new Uint8Array(width*height);
  for(let p=0;p<mask.length;p++){
    const i=p*channels; const alpha=data[i+3];
    mask[p]=(alpha>20&&colorDistance([data[i],data[i+1],data[i+2]],background)>24)?1:0;
  }
  const component=largestComponent(mask,width,height);
  const reasons:string[]=[];
  if(!component||component.area<width*height*.04) reasons.push('No complete phone-sized foreground component found');
  if(component?.touchesEdge) reasons.push('Foreground touches image edge; the phone may be cropped');
  if(candidate.viewHint&&candidate.viewHint!=='back'&&candidate.viewHint!=='unknown') reasons.push(`View is ${candidate.viewHint}, not an orthographic back view`);
  let score=1;
  if(component){
    const observed=component.width/component.height; const expected=device.widthMm/device.heightMm;
    const aspectError=Math.abs(observed-expected)/expected;
    if(aspectError>.08) reasons.push(`Phone aspect differs from official dimensions by ${(aspectError*100).toFixed(1)}%`);
    score-=Math.min(aspectError*2,.45);
    if(component.touchesEdge) score-=.3;
    if(component.area/(width*height)<.18) { reasons.push('Phone occupies too little of the image'); score-=.15; }
  } else score=0;
  if(candidate.viewHint==='back') score+=.1;
  score=Math.max(0,Math.min(1,score));
  const accepted=Boolean(component)&&score>=.62&&!component!.touchesEdge;
  const result:CandidateAnalysis={id:candidate.id,accepted,score:+score.toFixed(3),reasons,image:{width,height},provenance:{path:candidate.path,sourceUrl:candidate.sourceUrl,color:candidate.color,method:'silhouette-scale-v1'}};
  if(!component) return result;
  result.phoneBounds={x:component.x,y:component.y,width:component.width,height:component.height};
  const sx=device.widthMm/component.width, sy=device.heightMm/component.height;
  const disagreement=Math.abs(sx-sy)/((sx+sy)/2);
  const combined=(sx+sy)/2;
  result.mmPerPixel={x:+sx.toFixed(6),y:+sy.toFixed(6),combined:+combined.toFixed(6),disagreement:+disagreement.toFixed(4)};
  if(disagreement>.06) { result.accepted=false; result.reasons.push('Horizontal and vertical scales disagree; rectify perspective before measurement'); }
  const cameraPixels=candidate.cameraIslandHint??detectCameraIsland(data,width,channels,result.phoneBounds);
  if(cameraPixels){
    result.cameraIslandMm=toMm(cameraPixels,result.phoneBounds,combined);
    result.provenance.method=candidate.cameraIslandHint?'review-annotation-scale-v1':'deterministic-edge-search-v1';
    if(!candidate.cameraIslandHint) result.reasons.push('Camera island was detected automatically and requires overlay review');
  }
  if(candidate.lensHints) result.lensesMm=candidate.lensHints.map(c=>({x:+((c.x-component.x)*combined).toFixed(2),y:+((c.y-component.y)*combined).toFixed(2),radius:+(c.radius*combined).toFixed(2)}));
  if(candidate.flashHint) result.flashMm={x:+((candidate.flashHint.x-component.x)*combined).toFixed(2),y:+((candidate.flashHint.y-component.y)*combined).toFixed(2),radius:+(candidate.flashHint.radius*combined).toFixed(2)};
  return result;
}
