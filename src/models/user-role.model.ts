import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class UserRole extends Model {
  public userId!: number;
  public roleId!: number;
}

UserRole.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'user_id',
    },
    roleId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      field: 'role_id',
    },
  },
  {
    sequelize,
    tableName: 'user_roles',
    timestamps: true,
  }
);