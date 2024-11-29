import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';
import { Project } from './project.model';

export class Task extends Model {
  public task_id!: number;
  public project_id!: number;
  public title!: string;
  public description!: string;
  public status!: 'pending' | 'in_progress' | 'review' | 'completed';
  public priority!: 'low' | 'medium' | 'high' | 'urgent';
  public estimated_hours!: number;
  public start_date!: Date;
  public due_date!: Date;
  public created_by!: number;
  public assigned_to!: number;
}

Task.init(
  {
    task_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'in_progress', 'review', 'completed'),
      defaultValue: 'pending',
    },
    priority: {
      type: DataTypes.ENUM('low', 'medium', 'high', 'urgent'),
      defaultValue: 'medium',
    },
    estimated_hours: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: true,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    due_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assigned_to: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'tasks',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Modelo de Registro de Tiempo
export class TimeEntry extends Model {
  public entry_id!: number;
  public task_id!: number;
  public user_id!: number;
  public hours_logged!: number;
  public work_date!: Date;
  public description!: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public approved_by!: number | null;
  public approved_at!: Date | null;
}

TimeEntry.init(
  {
    entry_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    hours_logged: {
      type: DataTypes.DECIMAL(6, 2),
      allowNull: false,
    },
    work_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'approved', 'rejected'),
      defaultValue: 'pending',
    },
    approved_by: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    approved_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'time_entries',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);