import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/database';

export class Document extends Model {
  public document_id!: number;
  public project_id!: number;
  public task_id!: number | null;
  public title!: string;
  public file_path!: string;
  public file_type!: string;
  public uploaded_by!: number;
}

Document.init(
  {
    document_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    project_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    task_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file_path: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    file_type: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    uploaded_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'documents',
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
);