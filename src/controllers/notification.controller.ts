import { Request, Response, NextFunction } from 'express';
import { NotificationService } from '../services/notification.service';

export class NotificationController {
  static async getNotifications(req: Request, res: Response, next: NextFunction) {
    try {
      const options = {
        limit: Number(req.query.limit) || 10,
        offset: Number(req.query.offset) || 0,
        unreadOnly: req.query.unreadOnly === 'true',
      };

      const notifications = await NotificationService.getUserNotifications(
        req.user.id,
        options
      );
      res.json(notifications);
    } catch (error) {
      next(error);
    }
  }

  static async markAsRead(req: Request, res: Response, next: NextFunction) {
    try {
      const notification = await NotificationService.markAsRead(
        Number(req.params.id),
        req.user.id
      );
      res.json(notification);
    } catch (error) {
      next(error);
    }
  }
}