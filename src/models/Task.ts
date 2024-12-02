import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { Project } from './Project';
import { User } from './User';

@Table({
  tableName: 'tasks',
  timestamps: false,
})
export class Task extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  task_id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  task_name!: string;

  @Column(DataType.TEXT)
  description!: string | null;

  @Column({
    type: DataType.ENUM('todo', 'in_progress', 'done'),
    allowNull: false,
  })
  status!: 'todo' | 'in_progress' | 'done';

  @Column({
    type: DataType.DATE,
    allowNull: false,
  })
  due_date!: Date;

  @ForeignKey(() => Project)
  @Column(DataType.INTEGER)
  project_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  created_by!: number;

  @BelongsTo(() => Project)
  project!: Project;

  @BelongsTo(() => User, 'created_by')
  creator!: User;
}
