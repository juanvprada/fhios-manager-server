import { Model, Table, Column, ForeignKey, DataType } from 'sequelize-typescript';
import { User } from './User';
import { Project } from './Project';

@Table({
  tableName: 'project_members',
  timestamps: false,
})
export class ProjectMember extends Model {
  @ForeignKey(() => Project)
  @Column(DataType.INTEGER)
  project_id!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  user_id!: number;

  @Column({
    type: DataType.ENUM('owner', 'member', 'guest'),
    allowNull: false,
  })
  role!: 'owner' | 'member' | 'guest';

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  joined_at!: Date;
}
