import { Request, Response, NextFunction } from 'express';
import { LoggingService } from '../services/logging.service';
import { Metrics } from '../utils/metrics';

export class AuditController {
  static async getActivityLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const filters = {
        userId: req.query.userId ? Number(req.query.userId) : undefined,
        actionType: req.query.actionType as string,
        entityType: req.query.entityType as string,
        dateRange: req.query.dateRange ? JSON.parse(req.query.dateRange as string) : undefined,
        limit: Number(req.query.limit) || 100,
        offset: Number(req.query.offset) || 0,
      };

      const logs = await LoggingService.queryActivityLogs(filters);
      res.json(logs);
    } catch (error) {
      next(error);
    }
  }

  static async getMetrics(req: Request, res: Response, next: NextFunction) {
    try {
      const metrics = await Metrics.getMetrics();
      res.set('Content-Type', 'text/plain');
      res.send(metrics);
    } catch (error) {
      next(error);
    }
  }
}