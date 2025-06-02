import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const authController = new AuthController();

router.get("/me", authMiddleware, authController.me);

export default router;
