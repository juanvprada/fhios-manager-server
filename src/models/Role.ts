import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { UserRole } from './UserRole';

@Table({
  tableName: 'roles',
  timestamps: false,
})
export class Role extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  role_id!: number;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
    unique: true,
  })
  role_name!: string;

  @Column(DataType.TEXT)
  description!: string | null;

  @HasMany(() => UserRole)
  userRoles!: UserRole[];
}
