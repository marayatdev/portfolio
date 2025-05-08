import { Request, Response } from "express";
import { UserService } from "@/services/UserService";
import { logger } from "@/utils/logger";

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  public create = async (req: Request, res: Response) => {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      logger.error("Create user failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (err) {
      logger.error("Get users failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
