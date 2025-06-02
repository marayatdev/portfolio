import { UserModel } from "@/models/AuthModel";

export class AuthService {
  async getUserByEmail(email: string) {
    return await UserModel.findOne({ email });
  }

  async getUserById(id: string) {
    return await UserModel.findById(id);
  }

  async registereUser(data: {
    name: string;
    email: string;
    password: string;
    role?: number;
  }) {
    return await UserModel.create(data);
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}
