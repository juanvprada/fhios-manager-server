import { Model, Table, Column, DataType, HasMany } from 'sequelize-typescript';
import { UserRole } from './UserRole';
import { Task } from './Task';
import { Project } from './Project';

@Table({
  tableName: 'users',
  timestamps: false,
})
export class User extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  user_id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
  })
  password!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  first_name!: string;

  @Column({
    type: DataType.STRING(50),
    allowNull: false,
  })
  last_name!: string;

  @Column({
    type: DataType.ENUM('active', 'inactive'),
    defaultValue: 'active',
  })
  status!: 'active' | 'inactive';

  @HasMany(() => UserRole)
  userRoles!: UserRole[];

  @HasMany(() => Task, 'created_by')
  createdTasks!: Task[];

  @HasMany(() => Project, 'created_by')
  createdProjects!: Project[];
}
