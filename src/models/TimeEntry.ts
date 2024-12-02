import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { User } from './User';
import { Task } from './Task';

@Table({
  tableName: 'time_entries',
  timestamps: false,
})
export class TimeEntry extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  time_entry_id!: number;

  @Column(DataType.DATE)
  start_time!: Date;

  @Column(DataType.DATE)
  end_time!: Date;

  @Column(DataType.TEXT)
  notes!: string | null;

  @ForeignKey(() => Task)
  @Column(DataType.INTEGER)
  task_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => Task)
  task!: Task;

  @BelongsTo(() => User)
  user!: User;
}
