import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../config/sequelize';

// Definimos los atributos de la tabla roles
interface RoleAttributes {
  role_id: number;
  role_name: string;
  description?: string;
  created_at?: Date;
}

// Algunos campos son opcionales al crear una nueva instancia de Role
interface RoleCreationAttributes extends Optional<RoleAttributes, 'role_id' | 'description' | 'created_at'> {}

class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
  public role_id!: number;
  public role_name!: string;
  public description?: string;
  public created_at?: Date;
}

Role.init({
  role_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  role_name: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  sequelize,
  tableName: 'roles',
  timestamps: false
});

export default Role;
