# mcp-catfacts

Cat Facts MCP — wraps Cat Facts API (free, no auth)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 250+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_fact` | Get a random cat fact. Returns the fact text and character length. Use get_facts to retrieve multiple facts at once. |
| `list_breeds` | Search cat breeds by name or list all available breeds. Returns breed name, country of origin, coat type, and pattern details. |
| `get_facts` | Get multiple random cat facts at once. Specify count (e.g., 5). Returns array of fact texts with character lengths. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "catfacts": {
      "url": "https://gateway.pipeworx.io/catfacts/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 250+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Catfacts data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [All tools and guides](https://github.com/pipeworx-io/examples)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
