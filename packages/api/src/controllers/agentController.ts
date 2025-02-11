import { Request, Response } from "express";
import { AgentRuntime, Character } from "@elizaos/core";
import { AgentConfig } from "../types";
import { activeAgents, getAgent, validateAgent } from "../state";
import { startAgent } from "@elizaos/agent";
import { sendError, sendSuccess } from "../utils";

export const agentController = {
    // Create new agent
    async create(req: Request, res: Response) {
        try {
            const config: AgentConfig = req.body;

            // Modify character config based on enabled clients/plugins
            const character: Character = {
                ...config.character,
                clients: config.enabledClients || [],
                plugins: config.enabledPlugins || []
            };

            // Initialize agent runtime
            const runtime = await startAgent(character);
            activeAgents.set(runtime.agentId, runtime);

            sendSuccess(res, {
                agentId: runtime.agentId,
                name: character.name,
                enabledClients: config.enabledClients,
                enabledPlugins: config.enabledPlugins
            });
        } catch (error) {
            sendError(res, 500, "Failed to create agent");
        }
    },

    // Get agent status
    async getStatus(req: Request, res: Response) {
        const { agentId } = req.params;
        const agent = getAgent(agentId);

        if (!validateAgent(agent)) {
            return sendError(res, 404, "Agent not found");
        }

        sendSuccess(res, {
            agentId: agent.agentId,
            name: agent.character.name,
            status: "running",
            activeClients: agent.clients.map(c => c.id),
            activePlugins: agent.plugins.map(p => p.id)
        });
    },

    // Stop agent
    async stop(req: Request, res: Response) {
        const { agentId } = req.params;
        const agent = getAgent(agentId);

        if (agent) {
            await agent.shutdown();
            activeAgents.delete(agentId);
        }

        sendSuccess(res, null);
    }
};