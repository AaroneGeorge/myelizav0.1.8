import { UUID, Character } from "@elizaos/core";

export interface AgentConfig {
    character: Character;
    enabledClients?: string[];
    enabledPlugins?: string[];
}

export interface UserMemoryConfig {
    userId: UUID;
    agentId: UUID;
    roomId?: UUID;
}

export interface ClientConfig {
    clientId: string;
    enabled: boolean;
    config?: Record<string, any>;
}

export interface PluginConfig {
    pluginId: string;
    enabled: boolean;
    config?: Record<string, any>;
}