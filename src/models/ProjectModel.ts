import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface ProjectAttributes {
  project_id: number;
  project_name: string;
  description?: string;
  methodology: 'Scrum' | 'Kanban' | 'Waterfall';
  start_date: Date;
  end_date?: Date;
  status: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  created_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface ProjectCreationAttributes extends Optional<ProjectAttributes, 'project_id' | 'description' | 'end_date' | 'created_by' | 'created_at' | 'updated_at'> {}

class Project extends Model<ProjectAttributes, ProjectCreationAttributes> implements ProjectAttributes {
  public project_id!: number;
  public project_name!: string;
  public description?: string;
  public methodology!: 'Scrum' | 'Kanban' | 'Waterfall';
  public start_date!: Date;
  public end_date?: Date;
  public status!: 'planning' | 'in_progress' | 'completed' | 'on_hold' | 'cancelled';
  public created_by?: number;
  public created_at?: Date;
  public updated_at?: Date;
}

Project.init({
  project_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_name: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  methodology: {
    type: DataTypes.ENUM('Scrum', 'Kanban', 'Waterfall'),
    allowNull: false
  },
  start_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  end_date: {
    type: DataTypes.DATE,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('planning', 'in_progress', 'completed', 'on_hold', 'cancelled'),
    defaultValue: 'planning'
  },
  created_by: {
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
  tableName: 'projects',
  timestamps: false
});

export default Project;
