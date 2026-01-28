# Antigravity Global Setup

## 1. Global Skills Configuration (Active)
I have configured this workspace to use your **Global Skills** located at `C:\Users\rafac\.agents\skills`. 

Instead of copying files, I created **Directory Junctions** (links). This means:
- **Single Source of Truth**: The skills in `.agent/skills/` are direct links to your global `.agents` folder.
- **Global Updates**: If you edit a skill in one project (or the global folder), it updates everywhere.
- **No Duplication**: Files are not duplicated on disk.

Current Global Skills linked:
- `frontend-design`
- `ui-ux-pro-max`
- `shopify-development` (Available, even if not used in this project)
- `web-performance-optimization`
- ...and 8 others.

## 2. Global MCP Configuration
To configure MCPs globally for all your Antigravity projects, you should edit the global configuration file found at:

`C:\Users\rafac\.gemini\antigravity\mcp_config.json`

### Current Status
I inspected this file and found it currently only has `github-mcp-server` configured.

### How to add Global MCPs
You can edit that JSON file to add your preferred MCPs (like `shopify-dev-mcp`, `postgres`, etc.). For example, to add your Shopify MCP globally, you would add it to the `mcpServers` object in that file:

```json
{
  "mcpServers": {
    "github-mcp-server": { ... },
    "shopify-dev-mcp": {
      "command": "npx",
      "args": ["-y", "@shopify/dev-mcp@latest"],
      "transport": "stdio"
    }
  }
}
```

Once added there, they will be available in **all** Antigravity sessions on this machine.
