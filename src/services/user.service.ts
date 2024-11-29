import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { AppError } from '../utils/error';
import { UserRole } from '../models/user-role.model';
import { sequelize } from '../config/database';

export class UserService {
  static async createUser(userData: any) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.create(userData, { transaction });

      if (userData.roles && userData.roles.length > 0) {
        const userRoles = userData.roles.map((roleId: number) => ({
          userId: user.id,
          roleId: roleId,
        }));

        await UserRole.bulkCreate(userRoles, { transaction });
      }

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getUserById(id: number) {
    const user = await User.findByPk(id, {
      include: [
        {
          model: Role,
          through: { attributes: [] },
        },
      ],
    });

    if (!user) {
      throw new AppError(404, 'User not found');
    }

    return user;
  }

  static async updateUser(id: number, userData: any) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      await user.update(userData, { transaction });

      if (userData.roles) {
        await UserRole.destroy({
          where: { userId: id },
          transaction,
        });

        const userRoles = userData.roles.map((roleId: number) => ({
          userId: id,
          roleId: roleId,
        }));

        await UserRole.bulkCreate(userRoles, { transaction });
      }

      await transaction.commit();
      return user;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deleteUser(id: number) {
    const transaction = await sequelize.transaction();

    try {
      const user = await User.findByPk(id);
      if (!user) {
        throw new AppError(404, 'User not found');
      }

      await UserRole.destroy({
        where: { userId: id },
        transaction,
      });

      await user.destroy({ transaction });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}