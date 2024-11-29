import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/user.service';
import { validateUser } from '../validators/user.validator';

export class UserController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await validateUser(req.body);
      const user = await UserService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserService.getUserById(Number(req.params.id));
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      await validateUser(req.body);
      const user = await UserService.updateUser(Number(req.params.id), req.body);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await UserService.deleteUser(Number(req.params.id));
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}