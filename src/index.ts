/**
 * Cat Facts MCP — wraps Cat Facts API (free, no auth)
 *
 * Tools:
 * - get_fact: Get a random cat fact
 * - list_breeds: List cat breeds
 * - get_facts: Get multiple random cat facts
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://catfact.ninja';

type RawFact = {
  fact: string;
  length: number;
};

type RawFactsResponse = {
  current_page: number;
  data: RawFact[];
  total: number;
  per_page: number;
};

type RawBreed = {
  breed: string;
  country: string;
  origin: string;
  coat: string;
  pattern: string;
};

type RawBreedsResponse = {
  current_page: number;
  data: RawBreed[];
  total: number;
  per_page: number;
};

function formatFact(f: RawFact) {
  return { fact: f.fact, length: f.length };
}

function formatBreed(b: RawBreed) {
  return {
    breed: b.breed,
    country: b.country,
    origin: b.origin,
    coat: b.coat,
    pattern: b.pattern,
  };
}

const tools: McpToolExport['tools'] = [
  {
    name: 'get_fact',
    description: 'Get a single random cat fact.',
    inputSchema: {
      type: 'object',
      properties: {},
    },
  },
  {
    name: 'list_breeds',
    description: 'List cat breeds with details such as country, origin, coat, and pattern.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of breeds to return. Defaults to 10.',
        },
      },
    },
  },
  {
    name: 'get_facts',
    description: 'Get multiple random cat facts.',
    inputSchema: {
      type: 'object',
      properties: {
        limit: {
          type: 'number',
          description: 'Number of facts to return. Defaults to 5.',
        },
      },
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_fact':
      return getFact();
    case 'list_breeds':
      return listBreeds((args.limit as number | undefined) ?? 10);
    case 'get_facts':
      return getFacts((args.limit as number | undefined) ?? 5);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function getFact() {
  const res = await fetch(`${BASE_URL}/fact`);
  if (!res.ok) throw new Error(`Cat Facts API error: ${res.status}`);
  const data = (await res.json()) as RawFact;
  return formatFact(data);
}

async function listBreeds(limit: number) {
  const res = await fetch(`${BASE_URL}/breeds?limit=${limit}`);
  if (!res.ok) throw new Error(`Cat Facts API error: ${res.status}`);
  const data = (await res.json()) as RawBreedsResponse;
  return {
    total: data.total,
    breeds: data.data.map(formatBreed),
  };
}

async function getFacts(limit: number) {
  const res = await fetch(`${BASE_URL}/facts?limit=${limit}`);
  if (!res.ok) throw new Error(`Cat Facts API error: ${res.status}`);
  const data = (await res.json()) as RawFactsResponse;
  return {
    total: data.total,
    facts: data.data.map(formatFact),
  };
}

export default { tools, callTool } satisfies McpToolExport;
