import User from '../models/UserModel';

export class UserService {
  static async findById(id: number) {
    return await User.findByPk(id);
  }
}
