import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface KnowledgeBaseAttributes {
  kt_id: number;
  project_id?: number;
  title: string;
  content: string;
  created_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface KnowledgeBaseCreationAttributes extends Optional<KnowledgeBaseAttributes, 'kt_id' | 'project_id' | 'created_by' | 'created_at' | 'updated_at'> {}

class KnowledgeBase extends Model<KnowledgeBaseAttributes, KnowledgeBaseCreationAttributes> implements KnowledgeBaseAttributes {
  public kt_id!: number;
  public project_id?: number;
  public title!: string;
  public content!: string;
  public created_by?: number;
  public created_at?: Date;
  public updated_at?: Date;
}

KnowledgeBase.init({
  kt_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
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
  tableName: 'knowledge_base',
  timestamps: false
});

export default KnowledgeBase;
