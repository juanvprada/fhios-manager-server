import { Model, Table, Column, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import { User } from './User';

@Table({
  tableName: 'notifications',
  timestamps: false,
})
export class Notification extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  notification_id!: number;

  @Column(DataType.STRING(255))
  message!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @BelongsTo(() => User)
  user!: User;
}
