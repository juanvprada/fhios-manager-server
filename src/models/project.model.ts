import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';
import { User } from './user.model';

export class Project extends Model {
  public project_id!: number;
  public project_name!: string;
  public description!: string;
  public methodology!: 'scrum' | 'kanban' | 'waterfall';
  public start_date!: Date;
  public end_date!: Date | null;
  public status!: 'planning' | 'active' | 'on_hold' | 'completed';
  public created_by!: number;
}

Project.init(
  {
    project_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    methodology: {
      type: DataTypes.ENUM('scrum', 'kanban', 'waterfall'),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('planning', 'active', 'on_hold', 'completed'),
      defaultValue: 'planning',
    },
    created_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'projects',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);

// Modelo para miembros del proyecto
export class ProjectMember extends Model {
    public project_id!: number;
    public user_id!: number;
    public role_id!: number;
    public assigned_at!: Date;
  }
  
  ProjectMember.init(
    {
      project_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      assigned_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      tableName: 'project_members',
      timestamps: false,
    }
  );