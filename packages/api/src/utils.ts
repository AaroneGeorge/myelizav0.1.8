import { Response } from "express";

// Response helpers
export const sendError = (res: Response, status: number, message: string) => {
    console.error(`API Error: ${status} - ${message}`);
    res.status(status).json({ error: message });
};

export const sendSuccess = (res: Response, data: any) => {
    res.json({ success: true, data });
};

// Logging helpers
export const log = {
    info: (message: string, ...args: any[]) => {
        console.log(`[INFO] ${message}`, ...args);
    },
    error: (message: string, error?: any) => {
        console.error(`[ERROR] ${message}`, error || "");
    },
    debug: (message: string, ...args: any[]) => {
        if (process.env.NODE_ENV === "development") {
            console.debug(`[DEBUG] ${message}`, ...args);
        }
    }
};