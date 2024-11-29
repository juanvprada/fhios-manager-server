import { Request, Response, NextFunction } from 'express';
import { ProjectService } from '../services/project.service';
import { validateProject } from '../validators/project.validator';

export class ProjectController {
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      await validateProject(req.body);
      const project = await ProjectService.createProject(req.body, req.user.id);
      res.status(201).json(project);
    } catch (error) {
      next(error);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const project = await ProjectService.getProjectById(Number(req.params.id));
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      await validateProject(req.body);
      const project = await ProjectService.updateProject(
        Number(req.params.id),
        req.body,
        req.user.id
      );
      res.json(project);
    } catch (error) {
      next(error);
    }
  }

  static async getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const metrics = await ProjectService.getProjectMetrics(Number(req.params.id));
      res.json(metrics);
    } catch (error) {
      next(error);
    }
  }
}