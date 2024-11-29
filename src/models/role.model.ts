import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Role extends Model {
  public id!: number;
  public name!: string;
  public description!: string;
}

Role.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'roles',
    timestamps: true,
  }
);

// src/models/user-role.model.ts
