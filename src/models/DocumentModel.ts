import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface DocumentAttributes {
  document_id: number;
  project_id?: number;
  task_id?: number;
  title: string;
  file_path: string;
  file_type?: string;
  uploaded_by?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface DocumentCreationAttributes extends Optional<DocumentAttributes, 'document_id' | 'project_id' | 'task_id' | 'file_type' | 'uploaded_by' | 'created_at' | 'updated_at'> {}

class Document extends Model<DocumentAttributes, DocumentCreationAttributes> implements DocumentAttributes {
  public document_id!: number;
  public project_id?: number;
  public task_id?: number;
  public title!: string;
  public file_path!: string;
  public file_type?: string;
  public uploaded_by?: number;
  public created_at?: Date;
  public updated_at?: Date;
}

Document.init({
  document_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  file_path: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  file_type: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  uploaded_by: {
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
  tableName: 'documents',
  timestamps: false
});

export default Document;
