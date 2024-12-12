import { Router } from 'express';
import { createNotification, getNotifications, getNotificationById, updateNotification, deleteNotification, getUnreadNotificationsByUser } from '../controllers/NotificationController';

const router = Router();

// Rutas para notificaciones
router.post('/notifications', createNotification);
router.get('/notifications', getNotifications);
router.get('/notifications/:notification_id', getNotificationById);
router.put('/notifications/:notification_id', updateNotification);
router.delete('/notifications/:notification_id', deleteNotification);
router.get('/notifications/user/:user_id/unread', getUnreadNotificationsByUser);

export default router;
