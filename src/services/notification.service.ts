// src/services/notification.service.ts
import { Notification } from '../models/notification.model';
import { WebSocketService } from './websocket.service';
import { EmailService } from './email.service';
import { UserService } from './user.service';

export class NotificationService {
  private static wsService: WebSocketService;
  private static emailService: EmailService;

  static initialize(wsService: WebSocketService) {
    this.wsService = wsService;
  }

  static async createNotification(notificationData: any) {
    const notification = await Notification.create(notificationData);

    // Enviar notificación en tiempo real
    this.wsService.sendToUser(notification.user_id, {
      type: 'NEW_NOTIFICATION',
      notification,
    });

    // Enviar email si es necesario
    if (this.shouldSendEmail(notification.type)) {
      const user = await UserService.getUserById(notification.user_id);
      await EmailService.sendNotificationEmail(user.email, {
        title: notification.title,
        message: notification.message,
      });
    }

    return notification;
  }

  static async markAsRead(notificationId: number, userId: number) {
    const notification = await Notification.findOne({
      where: { notification_id: notificationId, user_id: userId },
    });

    if (!notification) {
      throw new AppError(404, 'Notification not found');
    }

    await notification.update({ read_status: true });
    return notification;
  }

  static async getUserNotifications(userId: number, options: any = {}) {
    const { limit = 10, offset = 0, unreadOnly = false } = options;

    const where: any = { user_id: userId };
    if (unreadOnly) {
      where.read_status = false;
    }

    return Notification.findAndCountAll({
      where,
      limit,
      offset,
      order: [['created_at', 'DESC']],
    });
  }

  private static shouldSendEmail(notificationType: string): boolean {
    // Lógica para determinar si se debe enviar email según el tipo
    const emailTypes = ['error', 'warning'];
    return emailTypes.includes(notificationType);
  }
}