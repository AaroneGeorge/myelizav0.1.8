import express from "express";
import cors from "cors";
import helmet from "helmet";
import agentRoutes from "./routes/agentRoutes";
import clientRoutes from "./routes/clientRoutes";
import memoryRoutes from "./routes/memoryRoutes";
import { errorHandler } from "./middleware/errorHandler";
import { activeAgents } from "./state";
import { log } from "./utils";

const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

// Health Routes
app.get("/health", (req, res) => {
    res.json({
        status: "ok",
        timestamp: new Date().toISOString(),
        activeAgents: activeAgents.size
    });
});

app.get("/api/health", (req, res) => {
    res.json({
        status: "ok",
        uptime: process.uptime(),
        timestamp: new Date().toISOString(),
        activeAgents: Array.from(activeAgents.keys())
    });
});

// API Routes
app.use("/api", agentRoutes);
app.use("/api", clientRoutes);
app.use("/api", memoryRoutes);

// Error handling
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

const start = async () => {
    try {
        const server = app.listen(PORT, () => {
            log.info(`
🚀 API Server Started Successfully!
🌍 HTTP Server: http://localhost:${PORT}
🏥 Health Check: http://localhost:${PORT}/health
📝 API Docs: http://localhost:${PORT}/api/health

Press Ctrl+C to stop
            `);
        });

        // Graceful shutdown
        process.on("SIGTERM", () => {
            log.info("SIGTERM received. Shutting down gracefully...");
            server.close(() => {
                log.info("Server closed");
                process.exit(0);
            });
        });
    } catch (error) {
        log.error("Failed to start server:", error);
        process.exit(1);
    }
};

start().catch((error) => log.error("Startup failed", error));