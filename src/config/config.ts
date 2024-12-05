export const jwtConfig = {
    secret: process.env.JWT_SECRET || 'supersecretkey',
    expiresIn: '1h', // El token expira en 1 hora
  };
  