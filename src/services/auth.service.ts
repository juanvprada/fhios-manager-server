import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model';
import { config } from '../config/env.config';
import { AppError } from '../utils/error';

export class AuthService {
  static async register(userData: any) {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    return User.create({
      ...userData,
      password: hashedPassword,
    });
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new AppError(401, 'Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new AppError(401, 'Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      config.JWT_SECRET,
      { expiresIn: '24h' }
    );

    return { token, user };
  }
}