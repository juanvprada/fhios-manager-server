import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface NotificationAttributes {
  notification_id: number;
  user_id?: number;
  title: string;
  message: string;
  type: 'task_assigned' | 'project_update' | 'deadline_reminder' | 'mention';
  reference_id?: number;
  read_status?: boolean;
  created_at?: Date;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'notification_id' | 'user_id' | 'reference_id' | 'read_status' | 'created_at'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public notification_id!: number;
  public user_id?: number;
  public title!: string;
  public message!: string;
  public type!: 'task_assigned' | 'project_update' | 'deadline_reminder' | 'mention';
  public reference_id?: number;
  public read_status?: boolean;
  public created_at?: Date;
}

Notification.init({
  notification_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  message: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  type: {
    type: DataTypes.ENUM('task_assigned', 'project_update', 'deadline_reminder', 'mention'),
    allowNull: false
  },
  reference_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  read_status: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'notifications',
  timestamps: false
});

export default Notification;
