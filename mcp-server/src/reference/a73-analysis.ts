import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { inspectViews } from './opencv.js';

type Manifest={device:{model:string;modelNumber:string;widthMm:number;heightMm:number;bodyThicknessMm:number;source:string};references:{id:string;file:string;expected:string[];color?:string;purpose?:string}[];cameraIsland:{widthMm:number;heightMm:number;leftMm:number;topMm:number;cornerRadiusMm:number;lenses:{role:string;xMm:number;yMm:number;radiusMm:number}[];flash:{xMm:number;yMm:number;radiusMm:number};classification:string;source:string;confidence:number}};
type Inspection={engine:string;method:string;sheetType:string;views:{kind:string;bounds:object;profile?:{estimatedCameraProtrusionMm:number;requiresOverlayReview:boolean}}[];warnings:string[]};
const workspaceRoot=resolve(dirname(fileURLToPath(import.meta.url)),'../../..');
const manifestPath=resolve(workspaceRoot,'references/a73/measurement-manifest.json');
const median=(values:number[])=>{const sorted=[...values].sort((a,b)=>a-b);const m=Math.floor(sorted.length/2);return sorted.length%2?sorted[m]:(sorted[m-1]+sorted[m])/2;};

export async function analyzeA73References(){
  const manifest=JSON.parse(await readFile(manifestPath,'utf8')) as Manifest;
  const reports=await Promise.all(manifest.references.map(async reference=>{
    const inspection=await inspectViews(resolve(manifestPath,'..',reference.file),manifest.device.bodyThicknessMm) as Inspection;
    const detected=inspection.views.map(view=>view.kind);
    const accepted=reference.expected.length>0&&reference.expected.every(kind=>detected.includes(kind));
    return {id:reference.id,color:reference.color,purpose:reference.purpose,accepted,expected:reference.expected,detected,sheetType:inspection.sheetType,engine:inspection.engine,method:inspection.method,warnings:inspection.warnings,views:inspection.views};
  }));
  const protrusions=reports.filter(report=>report.accepted).flatMap(report=>report.views.flatMap(view=>view.profile?[view.profile.estimatedCameraProtrusionMm]:[]));
  const cameraProtrusionMm=protrusions.length?+median(protrusions).toFixed(2):null;
  return {schemaVersion:1,device:manifest.device,engine:reports[0]?.engine??'unavailable',summary:{total:reports.length,accepted:reports.filter(report=>report.accepted).length,rejected:reports.filter(report=>!report.accepted).length,detectedViews:[...new Set(reports.filter(report=>report.accepted).flatMap(report=>report.detected))]},geometry:{body:{widthMm:manifest.device.widthMm,heightMm:manifest.device.heightMm,thicknessMm:manifest.device.bodyThicknessMm,classification:'confirmed'},cameraIsland:manifest.cameraIsland,cameraProtrusion:{valueMm:cameraProtrusionMm,classification:'image-derived',sampleCount:protrusions.length},maximumThicknessMm:cameraProtrusionMm===null?null:+(manifest.device.bodyThicknessMm+cameraProtrusionMm).toFixed(2)},reports,generationPolicy:{prototypeAllowed:reports.some(report=>report.accepted&&report.detected.includes('back'))&&reports.some(report=>report.accepted&&report.detected.includes('side')),printReady:false,reason:'Camera depth and side features remain image-derived; physical fit validation is required.'}};
}
