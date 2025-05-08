import { Router } from "express";
import { AuthController } from "@/controllers/AuthController";

const router = Router();
const authController = new AuthController();

router.get("/", authController.getAll);
router.post("/", authController.register);

export default router;
