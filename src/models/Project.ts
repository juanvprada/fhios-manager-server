import { Model, Table, Column, DataType, ForeignKey, HasMany } from 'sequelize-typescript';
import { User } from './User';
import { ProjectMember } from './ProjectMember';
import { Task } from './Task';

@Table({
  tableName: 'projects',
  timestamps: false,
})
export class Project extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  project_id!: number;

  @Column({
    type: DataType.STRING(100),
    allowNull: false,
  })
  project_name!: string;

  @Column(DataType.TEXT)
  description!: string | null;

  @Column({
    type: DataType.ENUM('scrum', 'kanban', 'waterfall'),
    allowNull: false,
  })
  methodology!: 'scrum' | 'kanban' | 'waterfall';

  @Column(DataType.DATE)
  start_date!: Date;

  @Column(DataType.DATE)
  end_date!: Date | null;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  created_by!: number;

  @HasMany(() => ProjectMember)
  members!: ProjectMember[];

  @HasMany(() => Task)
  tasks!: Task[];
}
