import { Request, Response } from "express";
import { AuthService } from "@/services/AuthService";
import { logger } from "@/utils/logger";
import { TypedRequestBody } from "@/utils/request";
import { User } from "@/types/auth";
import { ResponseFormatter } from "@/utils/response";
import * as argon2 from "argon2";
import jwt from "jsonwebtoken";

export class AuthController {
  private authService: AuthService;
  private jwtSecret: string;

  constructor() {
    this.authService = new AuthService();
    this.jwtSecret = process.env.JWT_SECRET || "bovhoeivfoebwfvbeifpwbqe";
  }

  public register = async (req: TypedRequestBody<User>, res: Response) => {
    try {

      const data: User = req.body;

      if (!data.name || !data.email || !data.password) {
        ResponseFormatter.notFound(res, "Missing required fields");
      }

      const existingUser = await this.authService.getUserByEmail(data.email);
      if (existingUser) {
        ResponseFormatter.validationError(res, { email: "Email already exists" });
      }

      const hashedPassword = await argon2.hash(data.password);

      const newUser = {
        ...data,
        password: hashedPassword,
      };

      const user = await this.authService.registereUser(newUser);

      if (!user) {
        ResponseFormatter.validationError(res, { email: "User creation failed" });
      }

      // Remove password from the response
      const { password, ...userWithoutPassword } = user.toObject();
      ResponseFormatter.success(res, userWithoutPassword, "User created successfully");

    } catch (err) {
      logger.error("Create user failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  };

  public login = async (req: TypedRequestBody<User>, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        ResponseFormatter.notFound(res, "Missing required fields");
      }

      const user = await this.authService.getUserByEmail(email);
      if (!user) {
        ResponseFormatter.validationError(res, { email: "Invalid credentials" });
        return;
      }

      const isPasswordValid = await argon2.verify(user.password, password);
      if (!isPasswordValid) {
        ResponseFormatter.validationError(res, { email: "Invalid credentials" });
      }

      const token = jwt.sign({ id: user._id, role: user.role }, this.jwtSecret, { expiresIn: "1h" });
      res.cookie("token", token, { httpOnly: true, secure: true }); 1
      res.cookie("user", JSON.stringify(user), { httpOnly: true, secure: true });
      res.cookie("role", user.role, { httpOnly: true, secure: true });

      // Remove password from the response
      const { password: _, ...userWithoutPassword } = user.toObject();
      ResponseFormatter.success(res, userWithoutPassword, "Login successful");

    } catch (err) {
      logger.error("Login failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  public logout = async (req: Request, res: Response) => {
    try {
      res.clearCookie("token");
      res.clearCookie("user");
      res.clearCookie("role");
      ResponseFormatter.success(res, {}, "Logout successful");
    } catch (err) {
      logger.error("Logout failed:", err);
      res.status(500).json({ message: "Internal server error" });
    }
  }

}
