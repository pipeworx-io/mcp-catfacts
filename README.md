# @pipeworx/mcp-catfacts

MCP server for the [Cat Facts API](https://catfact.ninja) — random cat facts and cat breed listings. Free, no auth required.

## Tools

| Tool | Description |
|------|-------------|
| `get_fact` | Get a single random cat fact |
| `list_breeds` | List cat breeds with country, origin, coat, and pattern |
| `get_facts` | Get multiple random cat facts |

## Quick Start

Add to your MCP client config:

```json
{
  "mcpServers": {
    "catfacts": {
      "type": "url",
      "url": "https://gateway.pipeworx.io/catfacts"
    }
  }
}
```

## CLI Usage

```bash
npx @anthropic-ai/mcp-client https://gateway.pipeworx.io/catfacts
```

## License

MIT
