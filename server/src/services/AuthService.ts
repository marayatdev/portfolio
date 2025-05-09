import { UserModel } from "@/models/AuthModel";

export class AuthService {

  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async registereUser(data: { name: string; email: string, password: string; role?: string }) {
    return await UserModel.create(data);
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}
