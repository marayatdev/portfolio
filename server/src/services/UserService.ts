import { UserModel } from "@/models/UserModel";

export class UserService {
  async createUser(data: { name: string; email: string }) {
    return await UserModel.create(data);
  }

  async getAllUsers() {
    return await UserModel.find();
  }
}
