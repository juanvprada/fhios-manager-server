import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface ProjectMemberAttributes {
  project_id: number;
  user_id: number;
  role_id?: number;
  assigned_at?: Date;
}

interface ProjectMemberCreationAttributes extends Optional<ProjectMemberAttributes, 'assigned_at'> {}

class ProjectMember extends Model<ProjectMemberAttributes, ProjectMemberCreationAttributes> implements ProjectMemberAttributes {
  public project_id!: number;
  public user_id!: number;
  public role_id?: number;
  public assigned_at?: Date;
}

ProjectMember.init({
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'project_members',
  timestamps: false
});

export default ProjectMember;
