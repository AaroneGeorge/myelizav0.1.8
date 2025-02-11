import { Router } from "express";
import type { IRouter } from "express";
import { clientController } from "../controllers/clientController";

const router: IRouter = Router();

router.post("/agents/:agentId/clients", clientController.toggleClient);
router.post("/agents/:agentId/plugins", clientController.togglePlugin);

export default router;