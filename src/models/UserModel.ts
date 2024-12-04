import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

interface UserAttributes {
  user_id: number;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  created_at?: Date;
  updated_at?: Date;
  last_login?: Date;
  status: 'active' | 'inactive' | 'suspended';
}

interface UserCreationAttributes extends Optional<UserAttributes, 'user_id' | 'created_at' | 'updated_at' | 'last_login'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public user_id!: number;
  public email!: string;
  public password!: string;
  public first_name!: string;
  public last_name!: string;
  public created_at?: Date;
  public updated_at?: Date;
  public last_login?: Date;
  public status!: 'active' | 'inactive' | 'suspended';
}

User.init({
  user_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  first_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  last_name: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  last_login: {
    type: DataTypes.DATE
  },
  status: {
    type: DataTypes.ENUM('active', 'inactive', 'suspended'),
    defaultValue: 'active'
  }
}, {
  sequelize,
  tableName: 'users',
  timestamps: false
});

export default User;
