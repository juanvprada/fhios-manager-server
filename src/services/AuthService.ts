import jwt from 'jsonwebtoken';
import User from '../models/UserModel';
import Role from '../models/RoleModel';
import UserRole from '../models/UserRoleModel';
import { jwtConfig } from '../config/config';
import { IUser } from '../interfaces/UserInterface';

export class AuthService {
  public static async register(userData: IUser): Promise<{ token: string, role: string }> {
    try {
      // Crear usuario
      const newUser = await User.create(userData);

      // Buscar el rol 'admin'
      const adminRole = await Role.findOne({
        where: { role_name: 'admin' }
      });

      if (!adminRole) {
        throw new Error('Admin role not found');
      }

      // Asignar rol admin al usuario
      await UserRole.create({
        user_id: newUser.user_id,
        role_id: adminRole.role_id
      });

      // Generar token
      const token = this.generateToken(newUser.user_id);

      return {
        token,
        role: 'admin'
      };
    } catch (error) {
      throw new Error(`Error during registration: ${(error as Error).message}`);
    }
  }

  public static async login(email: string, password: string): Promise<{ token: string, role: string }> {
    try {
      // Buscar usuario
      const user = await User.findOne({
        where: { email }
      });

      if (!user || !(await user.comparePassword(password))) {
        throw new Error('Invalid email or password');
      }

      // Buscar el rol del usuario
      const userRoleData = await UserRole.findOne({
        where: { user_id: user.user_id },
        include: [{
          model: Role,
          attributes: ['role_name']
        }]
      });

      // Actualizar último login
      await User.update(
        { last_login: new Date() },
        { where: { user_id: user.user_id } }
      );

      const token = this.generateToken(user.user_id);
      const roleName = userRoleData?.get('Role')?.get('role_name') || 'admin';
      
      return {
        token,
        role: roleName
      };
    } catch (error) {
      throw new Error(`Login failed: ${(error as Error).message}`);
    }
  }

  private static generateToken(userId: number): string {
    try {
      return jwt.sign({ userId }, jwtConfig.secret, { expiresIn: jwtConfig.expiresIn });
    } catch (error) {
      throw new Error(`Error generating token: ${(error as Error).message}`);
    }
  }

  public static validateToken(token: string): { userId: number } {
    try {
      return jwt.verify(token, jwtConfig.secret) as { userId: number };
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
