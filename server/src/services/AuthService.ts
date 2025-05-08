import { UserModel } from "@/models/AuthModel";

export class AuthService {
  async registereUser(data: { name: string; email: string, password: string; role?: string }) {
    return await UserModel.create(data);
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}
