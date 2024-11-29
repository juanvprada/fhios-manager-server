import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class ActivityLog extends Model {
  public log_id!: number;
  public user_id!: number;
  public action_type!: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout';
  public entity_type!: string;
  public entity_id!: number | null;
  public description!: string;
  public ip_address!: string | null;
  public user_agent!: string | null;
}

ActivityLog.init(
  {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    action_type: {
      type: DataTypes.ENUM('create', 'read', 'update', 'delete', 'login', 'logout'),
      allowNull: false,
    },
    entity_type: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    entity_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    ip_address: {
      type: DataTypes.STRING(45),
      allowNull: true,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'activity_logs',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: false,
  }
);