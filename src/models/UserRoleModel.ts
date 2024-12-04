import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/sequelize';

interface UserRoleAttributes {
  user_id: number;
  role_id: number;
  assigned_at?: Date;
}

class UserRole extends Model<UserRoleAttributes> implements UserRoleAttributes {
  public user_id!: number;
  public role_id!: number;
  public assigned_at?: Date;
}

UserRole.init({
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  role_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
  assigned_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'user_roles',
  timestamps: false
});

export default UserRole;
