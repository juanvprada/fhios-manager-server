import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface TimeEntryAttributes {
  entry_id: number;
  task_id?: number;
  user_id?: number;
  hours_logged: number;
  work_date: Date;
  description?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at?: Date;
  updated_at?: Date;
  approved_by?: number;
  approved_at?: Date;
}

interface TimeEntryCreationAttributes extends Optional<TimeEntryAttributes, 'entry_id' | 'task_id' | 'user_id' | 'description' | 'created_at' | 'updated_at' | 'approved_by' | 'approved_at'> {}

class TimeEntry extends Model<TimeEntryAttributes, TimeEntryCreationAttributes> implements TimeEntryAttributes {
  public entry_id!: number;
  public task_id?: number;
  public user_id?: number;
  public hours_logged!: number;
  public work_date!: Date;
  public description?: string;
  public status!: 'pending' | 'approved' | 'rejected';
  public created_at?: Date;
  public updated_at?: Date;
  public approved_by?: number;
  public approved_at?: Date;
}

TimeEntry.init({
  entry_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  task_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  hours_logged: {
    type: DataTypes.DECIMAL(6, 2),
    allowNull: false
  },
  work_date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  status: {
    type: DataTypes.ENUM('pending', 'approved', 'rejected'),
    defaultValue: 'pending'
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  approved_by: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  approved_at: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  sequelize,
  tableName: 'time_entries',
  timestamps: false
});

export default TimeEntry;
