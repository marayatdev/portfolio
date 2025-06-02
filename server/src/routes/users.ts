import { Router } from "express";
import { AuthController } from "@/controllers/auth.controller";
import { authMiddleware } from "@/middlewares/authMiddleware";
import { UserController } from "@/controllers/user.controller";

const router = Router();
const userController = new UserController();

router.get("/:id", authMiddleware, userController.readUserById);
router.get("/", authMiddleware, userController.listUsers);
router.post(
  "/check-password/:id",
  authMiddleware,
  userController.checkCurrentPassword
);
router.put("/:id", authMiddleware, userController.updateUserById);
router.delete("/:id", authMiddleware, userController.deleteUserById);

export default router;
