import jwt from 'jsonwebtoken';

const secretKey = process.env.SECRET_KEY as string;

export const generateToken = (userId: number): string => {
  return jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    throw new Error('Invalid token');
  }
};
