import { Request, Response } from "express";
import { ClientConfig, PluginConfig } from "../types";
import { getAgent, validateAgent } from "../state";
import { sendError, sendSuccess } from "../utils";

export const clientController = {
    // Toggle client
    async toggleClient(req: Request, res: Response) {
        const { agentId } = req.params;
        const config: ClientConfig = req.body;

        const agent = getAgent(agentId);
        if (!validateAgent(agent)) {
            return sendError(res, 404, "Agent not found");
        }

        try {
            if (config.enabled) {
                // Initialize client
                await agent.addClient(config.clientId, config.config);
            } else {
                // Stop client
                await agent.removeClient(config.clientId);
            }

            sendSuccess(res, { status: config.enabled ? "enabled" : "disabled" });
        } catch (error) {
            sendError(res, 500, "Failed to toggle client");
        }
    },

    // Toggle plugin
    async togglePlugin(req: Request, res: Response) {
        const { agentId } = req.params;
        const config: PluginConfig = req.body;

        const agent = getAgent(agentId);
        if (!validateAgent(agent)) {
            return sendError(res, 404, "Agent not found");
        }

        try {
            if (config.enabled) {
                // Initialize plugin
                await agent.addPlugin(config.pluginId, config.config);
            } else {
                // Remove plugin
                await agent.removePlugin(config.pluginId);
            }

            sendSuccess(res, { status: config.enabled ? "enabled" : "disabled" });
        } catch (error) {
            sendError(res, 500, "Failed to toggle plugin");
        }
    }
};