import { Router } from "express";
import type { IRouter } from "express";
import { agentController } from "../controllers/agentController";

const router: IRouter = Router();

router.post("/agents", agentController.create);
router.get("/agents/:agentId", agentController.getStatus);
router.delete("/agents/:agentId", agentController.stop);

export default router;