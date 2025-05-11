import { Router } from "express";
import { AuthController } from "@/controllers/AuthController";
import { authMiddleware } from "@/middlewares/authMiddleware";

const router = Router();
const authController = new AuthController();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

router.get("/me", authMiddleware, authController.me);

export default router;
