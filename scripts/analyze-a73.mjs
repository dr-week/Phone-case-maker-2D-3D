import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { analyzeA73References } from '../mcp-server/dist/reference/a73-analysis.js';

const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const outputDir=resolve(root,'outputs');
await mkdir(outputDir,{recursive:true});
const analysis=await analyzeA73References();
await writeFile(resolve(outputDir,'a73-analysis.json'),JSON.stringify(analysis,null,2));
console.log(JSON.stringify({output:resolve(outputDir,'a73-analysis.json'),summary:analysis.summary,geometry:analysis.geometry,generationPolicy:analysis.generationPolicy},null,2));
