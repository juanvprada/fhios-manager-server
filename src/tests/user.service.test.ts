import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { sequelize } from '../config/database';

describe('UserService', () => {
  beforeAll(async () => {
    await sequelize.sync({ force: true });
  });

  beforeEach(async () => {
    await User.destroy({ where: {} });
    await Role.destroy({ where: {} });
  });

  it('should create a user with roles', async () => {
    const role = await Role.create({
      name: 'developer',
      description: 'Developer role',
    });

    const userData = {
      email: 'test@test.com',
      password: 'password123',
      firstName: 'Test',
      lastName: 'User',
      roles: [role.id],
    };

    const user = await UserService.createUser(userData);
    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
  });

  // Más tests...
});