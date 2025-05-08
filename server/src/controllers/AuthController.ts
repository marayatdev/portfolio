import { Request, Response } from "express";
import { AuthService } from "@/services/AuthService";
import { logger } from "@/utils/logger";

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public register = async (req: Request, res: Response) => {
    try {
      const user = await this.authService.registereUser(req.body);
      res.status(201).json(user);
    } catch (err) {
      logger.error("Create user failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public getAll = async (_req: Request, res: Response) => {
    try {
      const users = await this.authService.getAllUsers();
      res.json(users);
    } catch (err) {
      logger.error("Get users failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };
}
