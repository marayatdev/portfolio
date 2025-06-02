import { UserService } from "@/services/users.service";
import { User } from "@/types/auth";
import { logger } from "@/utils/logger";
import { ResponseFormatter } from "@/utils/response";
import { Request, Response } from "express";
import * as argon2 from "argon2";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public listUsers = async (req: Request, res: Response) => {
    try {
      const users = await this.userService.listUsers();

      if (users.length === 0) {
        ResponseFormatter.notFound(res, "No users found", "Users");
      }

      const usersWithoutPassword = users.map((user) => {
        const { password: _, ...userWithoutPassword } = user.toObject();
        return userWithoutPassword;
      });

      ResponseFormatter.success(res, usersWithoutPassword, "Users found");
    } catch (err) {
      logger.error("listUsers failed", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public readUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      console.log(userId);

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      const user = await this.userService.readUserById(userId);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      const { password: _, ...userWithoutPassword } = user.toObject();

      ResponseFormatter.success(res, userWithoutPassword, "User found");
    } catch (err) {
      logger.error("readUserById failed", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public updateUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      const data: User = req.body;

      console.log("data", data);

      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }

      if (data.password) {
        data.password = await argon2.hash(data.password);
      }

      const user = await this.userService.updateUserById(userId, data);

      if (!user) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      ResponseFormatter.success(res, user, "User updated");
    } catch (err) {
      logger.error("updateUserById failed", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public deleteUserById = async (req: Request, res: Response) => {
    try {
      const userId = req.params.id;
      if (!userId) {
        res.status(400).json({ message: "User ID is required" });
        return;
      }
      await this.userService.deleteUserById(userId);
      ResponseFormatter.success(res, {}, "User deleted");
    } catch (err) {
      logger.error("deleteUserById failed", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
