import { Request, Response, NextFunction } from 'express';
import { TaskService } from '../services/task.service';
import { validateTask, validateTimeEntry } from '../validators/task.validator';

export class TaskController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await validateTask(req.body);
      const task = await TaskService.createTask(req.body, req.user.id);
      res.status(201).json(task);
    } catch (error) {
      next(error);
    }
  }

  static async updateStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const task = await TaskService.updateTaskStatus(
        Number(req.params.id),
        req.body.status,
        req.user.id
      );
      res.json(task);
    } catch (error) {
      next(error);
    }
  }

  static async logTime(req: Request, res: Response, next: NextFunction) {
    try {
      await validateTimeEntry(req.body);
      const timeEntry = await TaskService.logTime(req.body, req.user.id);
      res.status(201).json(timeEntry);
    } catch (error) {
      next(error);
    }
  }

  static async approveTime(req: Request, res: Response, next: NextFunction) {
    try {
      const timeEntry = await TaskService.approveTime(
        Number(req.params.entryId),
        req.user.id
      );
      res.json(timeEntry);
    } catch (error) {
      next(error);
    }
  }
}