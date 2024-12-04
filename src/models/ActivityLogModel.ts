import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface ActivityLogAttributes {
  log_id: number;
  user_id: number;
  action_type: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout';
  entity_type: string;
  entity_id?: number;
  description: string;
  ip_address?: string;
  user_agent?: string;
  created_at?: Date;
}

interface ActivityLogCreationAttributes extends Optional<ActivityLogAttributes, 'log_id' | 'entity_id' | 'ip_address' | 'user_agent' | 'created_at'> {}

class ActivityLog extends Model<ActivityLogAttributes, ActivityLogCreationAttributes> implements ActivityLogAttributes {
  public log_id!: number;
  public user_id!: number;
  public action_type!: 'create' | 'read' | 'update' | 'delete' | 'login' | 'logout';
  public entity_type!: string;
  public entity_id?: number;
  public description!: string;
  public ip_address?: string;
  public user_agent?: string;
  public created_at?: Date;
}

ActivityLog.init({
  log_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  action_type: {
    type: DataTypes.ENUM('create', 'read', 'update', 'delete', 'login', 'logout'),
    allowNull: false
  },
  entity_type: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  entity_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  ip_address: {
    type: DataTypes.STRING(45),
    allowNull: true
  },
  user_agent: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'activity_logs',
  timestamps: false
});

export default ActivityLog;
