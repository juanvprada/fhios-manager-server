import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../sequelize';
import { IUser } from '../interfaces/user-interface';

interface UserCreationAttributes extends Optional<IUser, 'id'> {}

class User extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: number;
  public name!: string;
  public email!: string;
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
});

export default User;
