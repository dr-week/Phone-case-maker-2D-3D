import { spawn } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const run = (args) => spawn(process.execPath, args, { cwd: root, stdio: 'inherit' });

const compiler = run(['mcp-server/node_modules/typescript/bin/tsc', '-p', 'mcp-server/tsconfig.json']);
const buildCode = await new Promise(resolveCode => compiler.on('exit', resolveCode));
if (buildCode !== 0) process.exit(buildCode ?? 1);

const bridge = run(['mcp-server/dist/http-bridge.js']);
const vite = run(['node_modules/vite/bin/vite.js']);
const stop = () => { bridge.kill(); vite.kill(); };
process.on('SIGINT', stop);
process.on('SIGTERM', stop);
bridge.on('exit', code => { vite.kill(); process.exit(code ?? 0); });
vite.on('exit', code => { bridge.kill(); process.exit(code ?? 0); });
