import { Model, Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';
import { Role } from './Role';

@Table({
  tableName: 'user_roles',
  timestamps: false,
})
export class UserRole extends Model {
  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  role_id!: number;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  assigned_at!: Date;
}
