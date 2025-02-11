import { AgentRuntime } from "@elizaos/core";

export const activeAgents = new Map<string, AgentRuntime>();

export const getAgent = (agentId: string): AgentRuntime | undefined => {
    return activeAgents.get(agentId);
};

export const validateAgent = (agent: AgentRuntime | undefined): boolean => {
    return agent !== undefined;
};