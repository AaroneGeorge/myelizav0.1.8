import { Router } from "express";
import type { IRouter } from "express";
import { memoryController } from "../controllers/memoryController";

const router: IRouter = Router();

router.post("/agents/:agentId/memories", memoryController.store);
router.get("/agents/:agentId/memories", memoryController.search);

export default router;