import { Request, Response } from 'express';
import { AuthService } from '../services/AuthService';

export class AuthController {
  public static async register(req: Request, res: Response): Promise<void> {
    try {
      const token = await AuthService.register(req.body);
      res.status(201).json({ token });
    } catch (error) {

      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      } else {
        res.status(400).json({ error: 'An unknown error occurred' });
      }
    }

  }
  
  public static async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const { token, role } = await AuthService.login(email, password); // AuthService ahora devuelve ambos
      res.status(200).json({ token, role }); // Enviamos ambos al frontend
    } catch (error) {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  }
}
