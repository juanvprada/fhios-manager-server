import { DataTypes, Model } from "sequelize";

export class KnowledgeBase extends Model {
    public kt_id!: number;
    public project_id!: number;
    public title!: string;
    public content!: string;
    public created_by!: number;
  }
  
  KnowledgeBase.init(
    {
      kt_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      project_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: 'knowledge_base',
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );