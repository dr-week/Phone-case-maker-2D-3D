import { execFile } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run=promisify(execFile);
const script=resolve(dirname(fileURLToPath(import.meta.url)),'../../vision/opencv_analyzer.py');
const upscaleScript=resolve(dirname(fileURLToPath(import.meta.url)),'../../vision/upscale_and_measure.py');

export async function inspectViews(imagePath:string,depthMm:number){
  const {stdout}=await run('python',[script,imagePath,'--depth-mm',String(depthMm)],{windowsHide:true,maxBuffer:2_000_000});
  return JSON.parse(stdout) as unknown;
}

export async function upscaleAndMeasure(imagePath:string,outputPath:string,depthMm=7.6,widthMm=76.1,heightMm=163.7,scale=3){
  const {stdout}=await run('python',[upscaleScript,imagePath,'--output',outputPath,'--depth-mm',String(depthMm),'--width-mm',String(widthMm),'--height-mm',String(heightMm),'--scale',String(scale)],{windowsHide:true,maxBuffer:2_000_000});
  return JSON.parse(stdout) as unknown;
}
