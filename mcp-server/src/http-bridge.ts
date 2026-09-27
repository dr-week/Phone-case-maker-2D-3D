import http from 'node:http';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { randomUUID } from 'node:crypto';
import { pingBlender, relayToBlender, validatePayload } from './relay.js';
import { measureReferences } from './reference/pipeline.js';
import { validateMeasurementRequest } from './reference/validation.js';
import { inspectViews, upscaleAndMeasure } from './reference/opencv.js';
import { analyzeA73References } from './reference/a73-analysis.js';
const workspaceRoot=resolve(dirname(fileURLToPath(import.meta.url)),'../..');
function setCors(req: http.IncomingMessage, res: http.ServerResponse) { const origin = req.headers.origin ?? ''; if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin)) res.setHeader('Access-Control-Allow-Origin', origin); res.setHeader('Access-Control-Allow-Headers', 'content-type'); }
const readJson=(req:http.IncomingMessage)=>new Promise<unknown>((resolveBody,reject)=>{let body='';req.on('data',chunk=>{body+=chunk;if(body.length>12_000_000)reject(new Error('Request body is too large'));});req.on('end',()=>{try{resolveBody(JSON.parse(body));}catch{reject(new Error('Invalid JSON body'));}});req.on('error',reject);});
const server = http.createServer(async (req,res)=>{
  setCors(req,res); res.setHeader('content-type','application/json');
  if(req.method==='OPTIONS'){res.writeHead(204);res.end();return;}
  if(req.method==='GET'&&req.url==='/api/blender-status'){try{const result=await pingBlender();res.writeHead(200);res.end(result);}catch{res.writeHead(503);res.end(JSON.stringify({ok:false,error:'Open Blender and enable the CaseForm add-on.'}));}return;}
  if(req.method==='GET'&&req.url==='/api/reference/a73-analysis'){try{const result=await analyzeA73References();res.writeHead(200);res.end(JSON.stringify(result));}catch(error){res.writeHead(500);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'Reference analysis failed'}));}return;}
  if(req.method==='POST'&&req.url==='/api/reference/upload'){
    try{const body=await readJson(req) as {name?:string;mime?:string;data?:string};const extensions:Record<string,string>={'image/png':'png','image/jpeg':'jpg','image/webp':'webp'};const extension=body.mime?extensions[body.mime]:undefined;if(!extension||typeof body.data!=='string')throw new Error('PNG, JPEG or WebP image required');const bytes=Buffer.from(body.data,'base64');if(!bytes.length||bytes.length>8_000_000)throw new Error('Image must be between 1 byte and 8 MB');const directory=resolve(workspaceRoot,'references/a73/uploads');await mkdir(directory,{recursive:true});const file=`${randomUUID()}.${extension}`,absolute=resolve(directory,file);await writeFile(absolute,bytes);res.writeHead(201);res.end(JSON.stringify({id:file,name:body.name??file,path:`references/a73/uploads/${file}`}));}catch(error){res.writeHead(400);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'Upload failed'}));}return;
  }
  if(req.method==='POST'&&req.url==='/api/reference/measure'){
    try{const input=validateMeasurementRequest(await readJson(req),workspaceRoot);const result=await measureReferences(input.device,input.candidates);res.writeHead(200);res.end(JSON.stringify(result));}
    catch(error){res.writeHead(400);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'Reference measurement failed'}));}return;
  }
  if(req.method==='POST'&&req.url==='/api/reference/inspect'){
    try{const body=await readJson(req) as {path?:string;depthMm?:number};if(typeof body.path!=='string'||typeof body.depthMm!=='number')throw new Error('path and depthMm are required');const imagePath=resolve(workspaceRoot,body.path);const allowed=resolve(workspaceRoot,'references')+'\\';if(!imagePath.startsWith(allowed))throw new Error('Reference path must stay inside the workspace references directory');const result=await inspectViews(imagePath,body.depthMm);res.writeHead(200);res.end(JSON.stringify(result));}
    catch(error){res.writeHead(400);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'View inspection failed'}));}return;
  }
  if(req.method==='POST'&&req.url==='/api/reference/upscale-and-measure'){
    try{
      const body=await readJson(req) as {path?:string;depthMm?:number;widthMm?:number;heightMm?:number;scale?:number};
      const inputRelPath = body.path ?? 'references/a73/source/measurement/rear-gray-complete.png';
      const imagePath=resolve(workspaceRoot,inputRelPath);
      const allowedRefs=resolve(workspaceRoot,'references')+'\\';
      const allowedPublic=resolve(workspaceRoot,'public')+'\\';
      if(!imagePath.startsWith(allowedRefs) && !imagePath.startsWith(allowedPublic)) {
        throw new Error('Reference path must stay inside the references or public directory');
      }
      const outPublic=resolve(workspaceRoot,'public/a73-upscaled-analysis.png');
      const outDist=resolve(workspaceRoot,'dist/a73-upscaled-analysis.png');
      const result=await upscaleAndMeasure(imagePath,outPublic,body.depthMm??7.6,body.widthMm??76.1,body.heightMm??163.7,body.scale??3) as any;
      try{await writeFile(outDist,await readFile(outPublic));}catch{}
      res.writeHead(200);res.end(JSON.stringify(result));
    }
    catch(error){res.writeHead(400);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'Upscale and measurement failed'}));}
    return;
  }
  if(req.method!=='POST'||req.url!=='/api/open-in-blender'){res.writeHead(404);res.end(JSON.stringify({ok:false}));return;}
  try{const result=await relayToBlender(validatePayload(await readJson(req)));res.writeHead(200);res.end(result);}catch(error){res.writeHead(503);res.end(JSON.stringify({ok:false,error:error instanceof Error?error.message:'Blender bridge error'}));}
});
server.listen(Number(process.env.BRIDGE_PORT ?? 3000),'127.0.0.1',()=>console.log('CaseForm bridge: http://127.0.0.1:3000'));
