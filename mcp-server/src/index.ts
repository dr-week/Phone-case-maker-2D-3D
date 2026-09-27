import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { CallToolRequestSchema, ListToolsRequestSchema } from '@modelcontextprotocol/sdk/types.js';
import { relayToBlender, validatePayload } from './relay.js';

const schema = { type: 'object', additionalProperties: false, required: ['device','dimensions','tolerances','cornerSlits'], properties: { device: { type: 'string' }, dimensions: { type: 'object' }, tolerances: { type: 'object' }, cornerSlits: { type: 'object' }, wallThickness: { type: 'number' } } } as const;

const server = new Server({ name: 'caseforge-blender', version: '0.1.0' }, { capabilities: { tools: {} } });
server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: [{ name: 'generate_case_mesh', description: 'Validate CaseForge parameters and send them to the local Blender receiver.', inputSchema: { type: 'object', properties: { parameters: schema }, required: ['parameters'] } }] }));
server.setRequestHandler(CallToolRequestSchema, async request => {
  if (request.params.name !== 'generate_case_mesh') throw new Error('Unknown tool');
  const result = await relayToBlender(validatePayload(request.params.arguments?.parameters));
  return { content: [{ type: 'text', text: result }] };
});
await server.connect(new StdioServerTransport());
