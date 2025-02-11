import { Request, Response } from "express";
import { Memory } from "@elizaos/core";
import { activeAgents, getAgent, validateAgent } from "../state";
import { sendError, sendSuccess } from "../utils";

export const memoryController = {
    // Store memory
    async store(req: Request, res: Response) {
        const { agentId } = req.params;
        const { userId, content } = req.body;

        const agent = getAgent(agentId);
        if (!validateAgent(agent)) {
            return sendError(res, 404, "Agent not found");
        }

        try {
            const memory: Memory = {
                type: "message",
                content,
                userId,
                agentId,
                createdAt: new Date().toISOString()
            };

            await agent.storeMemory(memory);
            sendSuccess(res, memory);
        } catch (error) {
            sendError(res, 500, "Failed to store memory");
        }
    },

    // Search memories
    async search(req: Request, res: Response) {
        const { agentId } = req.params;
        const { userId, query } = req.body;

        const agent = getAgent(agentId);
        if (!validateAgent(agent)) {
            return sendError(res, 404, "Agent not found");
        }

        try {
            const memories = await agent.searchMemories({
                userId,
                query
            });
            sendSuccess(res, memories);
        } catch (error) {
            sendError(res, 500, "Failed to search memories");
        }
    }
};