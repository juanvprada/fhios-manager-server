import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface TaskAttributes {
  task_id: number;
  project_id?: number;
  title: string;
  description?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  estimated_hours?: number;
  start_date?: Date;
  due_date?: Date;
  created_by?: number;
  assigned_to?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface TaskCreationAttributes extends Optional<TaskAttributes, 'task_id' | 'project_id' | 'description' | 'estimated_hours' | 'start_date' | 'due_date' | 'created_by' | 'assigned_to' | 'created_at' | 'updated_at'> {}

class Task extends Model<TaskAttributes, TaskCreationAttributes> implements TaskAttributes {
  public task_id!: number;
  public project_id?: number;
  public title!: string;
  public description?: string;
  public status!: 'pending' | 'in_progress' | 'completed' | 'blocked';
  public priority!: 'low' | 'medium' | 'high' | 'urgent';
  public estimated_hours?: number;
  public start_date?: Date;
  public due_date?: Date;
  public created_by?: number;
  public assigned_to?: number;
  public created_at?: Date;
  public updated_at?: Date;
}

Task.init({
  task_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'in_progress', 'completed', 'blocked'),
    defaultValue: 'pending'
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
    defaultValue: 'medium'
  },
  estimated_hours: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: true
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  due_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  assigned_to: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'tasks',
  timestamps: false
});

export default Task;
