import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Project } from './Project';

@Table({
  tableName: 'documents',
  timestamps: false,
})
export class Document extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  document_id!: number;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  title!: string;

  @Column(DataType.TEXT)
  content!: string;

  @ForeignKey(() => Project)
  @Column(DataType.INTEGER)
  project_id!: number;

  @BelongsTo(() => Project)
  project!: Project;
}
