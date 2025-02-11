# ElizaOS API

The ElizaOS API provides a RESTful interface for managing AI agents, their memories, and their integrations. This API allows you to create and manage multiple agents with different personalities, manage their client connections (Discord, Telegram, etc.), and handle their memory systems.

## Table of Contents
- [Installation](#installation)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

## Installation

```bash
# From the root of the ElizaOS project
pnpm install
```

## Getting Started

1. Start the API server:
```bash
# Development mode
pnpm --filter @elizaos/api dev

# Production mode
pnpm --filter @elizaos/api start
```

2. The API will be available at `http://localhost:3000/api`

## API Endpoints

### Agents

#### Create Agent
```http
POST /api/agents
```
```json
{
    "character": {
        "name": "Tate",
        "modelProvider": "openai",
        "settings": {
            "voice": {
                "model": "en_US-male-medium"
            }
        }
    },
    "enabledClients": ["discord", "telegram"],
    "enabledPlugins": ["@elizaos/plugin-twitter", "@elizaos/plugin-web-search"]
}
```

#### Get Agent Status
```http
GET /api/agents/:agentId
```

#### Stop Agent
```http
DELETE /api/agents/:agentId
```

### Clients & Plugins

#### Toggle Client
```http
POST /api/agents/:agentId/clients
```
```json
{
    "clientId": "discord",
    "enabled": true,
    "config": {
        "token": "your-discord-token"
    }
}
```

#### Toggle Plugin
```http
POST /api/agents/:agentId/plugins
```
```json
{
    "pluginId": "@elizaos/plugin-twitter",
    "enabled": true,
    "config": {
        "apiKey": "your-twitter-api-key"
    }
}
```

### Memory System

#### Store Memory
```http
POST /api/agents/:agentId/memories
```
```json
{
    "userId": "user-uuid",
    "content": {
        "text": "Hello, how are you?"
    }
}
```

#### Search Memories
```http
GET /api/agents/:agentId/memories
```
```json
{
    "userId": "user-uuid",
    "query": "previous conversation about AI"
}
```

## Configuration

The API can be configured using environment variables:

```env
PORT=3000                    # API port (default: 3000)
NODE_ENV=development        # Environment (development/production)
LOG_LEVEL=info             # Logging level
```

## Examples

### Creating an Agent with Specific Integrations

```typescript
// Example: Create Tate agent with Discord and Twitter
const response = await fetch("http://localhost:3000/api/agents", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        character: tateCharacter,
        enabledClients: ["discord"],
        enabledPlugins: ["@elizaos/plugin-twitter"]
    })
});

const { agentId } = await response.json();
```

### Managing Client Connections

```typescript
// Enable Discord client
await fetch(`http://localhost:3000/api/agents/${agentId}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        clientId: "discord",
        enabled: true,
        config: {
            token: "your-discord-token"
        }
    })
});

// Disable Discord client
await fetch(`http://localhost:3000/api/agents/${agentId}/clients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        clientId: "discord",
        enabled: false
    })
});
```

### Working with Memories

```typescript
// Store a memory
await fetch(`http://localhost:3000/api/agents/${agentId}/memories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        userId: "user123",
        content: {
            text: "Remember to follow up on our AI discussion"
        }
    })
});

// Search memories
const memories = await fetch(`http://localhost:3000/api/agents/${agentId}/memories?userId=user123&query=AI discussion`);
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure the API server is running
   - Check if the port is available
   - Verify firewall settings

2. **Authentication Errors**
   - Verify client tokens and API keys
   - Check if the client is properly configured

3. **Memory Search Not Working**
   - Ensure the database is properly initialized
   - Check if vector embeddings are working
   - Verify memory storage permissions

### Logs

API logs are stored in:
- Development: `console.log` output
- Production: `/var/log/elizaos/api.log` (when using systemd)

### Getting Help

- Open an issue on GitHub
- Join our Discord community
- Check the ElizaOS documentation

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.