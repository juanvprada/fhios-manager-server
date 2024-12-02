import { Model, Table, Column, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'activity_logs',
  timestamps: false,
})
export class ActivityLog extends Model {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  log_id!: number;

  @Column(DataType.STRING(255))
  activity!: string;

  @Column({
    type: DataType.DATE,
    defaultValue: DataType.NOW,
  })
  timestamp!: Date;
}
