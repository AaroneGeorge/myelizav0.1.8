I'll break down the key endpoints for managing and interacting with agents:

### 1. Create/Update Agent (POST /agents/{agentId}/set)
This endpoint creates a new agent or updates an existing one.

```json
POST /agents/{agentId}/set
{
    "id": "uuid-string",
    "name": "Agent Name",
    "description": "Agent description",
    "bio": "Agent biography",
    "lore": "Agent background story",
    "settings": {
        "OPENAI_API_KEY": "your-api-key",
        "DISCORD_API_TOKEN": "optional-discord-token",
        // other settings...
    }
}
```

### 2. Stop Agent
The agent is automatically stopped when you update it using the `/set` endpoint. There isn't a dedicated stop endpoint - updating or creating a new agent configuration will handle stopping the previous instance.

### 3. Chat with Agent (POST /{agentId}/message)
Send messages to chat with an agent:

```json
POST /{agentId}/message
{
    "text": "Your message here",
    "roomId": "optional-room-uuid",
    "userId": "optional-user-id",
    "userName": "optional-user-name"
}
```

You can also attach files by using multipart/form-data with a "file" field.

### 4. Get Agent Info

List all agents:
```
GET /agents
```

Get specific agent details:
```
GET /agents/{agentId}
```

### 5. Get Agent Messages/Memories
Retrieve chat history:

```
GET /agents/{agentId}/{roomId}/memories
```

### Additional Voice Features

Convert text to speech:
```json
POST /{agentId}/tts
{
    "text": "Text to convert to speech"
}
```

Send voice message and get response:
```json
POST /{agentId}/speak
{
    "text": "Your message here",
    "roomId": "optional-room-uuid",
    "userId": "optional-user-id",
    "userName": "optional-user-name"
}
```

Process audio to text:
```
POST /{agentId}/whisper
// Attach audio file using multipart/form-data with "file" field
```

### Example Flow

1. Create an agent:
```json
POST /agents/new-agent-id/set
{
    "id": "new-agent-id",
    "name": "Assistant Bot",
    "description": "A helpful AI assistant",
    "bio": "I am a friendly AI assistant ready to help!",
    "settings": {
        "OPENAI_API_KEY": "your-api-key"
    }
}
```

2. Chat with the agent:
```json
POST /new-agent-id/message
{
    "text": "Hello, can you help me with something?",
    "userId": "user123",
    "userName": "John"
}
```

3. Get chat history:
```
GET /agents/new-agent-id/default-room-new-agent-id/memories
```

Note: The agent ID can be either a UUID or the agent's name (case-insensitive). If using the agent's name, the system will look for a matching agent.
