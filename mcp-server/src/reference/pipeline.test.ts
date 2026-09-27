import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import test from 'node:test';
import sharp from 'sharp';
import { measureReferences } from './pipeline.js';

test('combines independent rear-view measurements and reports spread',async()=>{
  const directory=await mkdtemp(path.join(tmpdir(),'caseform-reference-'));
  try{
    const make=async(name:string,left:number)=>{const file=path.join(directory,name);await sharp({create:{width:500,height:900,channels:4,background:'#ffffff'}}).composite([{input:Buffer.from(`<svg width="380" height="820"><rect width="380" height="820" rx="34" fill="#505050"/><rect x="${left}" y="32" width="174" height="214" rx="25" fill="#777" stroke="#222" stroke-width="5"/></svg>`),left:60,top:40}]).png().toFile(file);return file;};
    const first=await make('gray.png',22), second=await make('mint.png',24);
    const device={model:'Samsung Galaxy A73 5G',widthMm:76.1,heightMm:163.7,depthMm:7.6,source:'Samsung'};
    const result=await measureReferences(device,[
      {id:'gray',path:first,color:'gray',viewHint:'back',cameraIslandHint:{x:82,y:72,width:174,height:214}},
      {id:'mint',path:second,color:'mint',viewHint:'back',cameraIslandHint:{x:84,y:72,width:174,height:214}},
    ]);
    assert.deepEqual(result.selectedCandidateIds,['gray','mint']);
    assert.equal(result.cameraIsland?.classification,'image-derived');
    assert.ok((result.cameraIsland?.rectMm.width??0)>34);
    assert.ok((result.cameraIsland?.spreadMm.x??0)>0);
    assert.equal(result.printReady,false);
  } finally { await rm(directory,{recursive:true,force:true}); }
});

test('rejects a cropped phone image',async()=>{
  const directory=await mkdtemp(path.join(tmpdir(),'caseform-reference-'));
  try{
    const file=path.join(directory,'cropped.png');
    await sharp({create:{width:300,height:500,channels:4,background:'#555555'}}).png().toFile(file);
    const result=await measureReferences({model:'A73',widthMm:76.1,heightMm:163.7,depthMm:7.6,source:'Samsung'},[{id:'cropped',path:file,viewHint:'back'}]);
    assert.equal(result.candidates[0].accepted,false);
  } finally { await rm(directory,{recursive:true,force:true}); }
});
