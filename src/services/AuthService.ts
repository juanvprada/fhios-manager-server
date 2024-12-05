import jwt from 'jsonwebtoken';
import  User  from '../models/UserModel';
import { jwtConfig } from '../config/config';
import { IUser } from '../interfaces/UserInterface';

export class AuthService {
  public static async register(userData: IUser): Promise<string> {
    const newUser = await User.create(userData);
    return this.generateToken(newUser.user_id);
  }

  public static async login(email: string, password: string): Promise<string> {
    const user = await User.findOne({ where: { email } });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error('Invalid email or password');
    }
    return this.generateToken(user.user_id);
  }

  private static generateToken(userId: number): string {
    return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
  }
}
