import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'knowledge_bases',
  timestamps: false,
})
export class KnowledgeBase extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  kb_id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  topic!: string;

  @Column(DataType.TEXT)
  details!: string | null;
}
