import { Request, Response } from 'express';
import Notification from '../models/NotificationModel';
import { INotification } from '../interfaces/NotificationInterface';

// Crear una nueva notificación
export const createNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification: INotification = req.body;
    const newNotification = await Notification.create(notification);
    res.status(201).json(newNotification);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las notificaciones
export const getNotifications = async (req: Request, res: Response): Promise<void> => {
  try {
    const notifications = await Notification.findAll();
    res.status(200).json(notifications);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener una notificación por ID
export const getNotificationById = async (req: Request, res: Response): Promise<void> => {
  try {
    const notification = await Notification.findByPk(req.params.notification_id);
    if (notification) {
      res.status(200).json(notification);
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar una notificación
export const updateNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Notification.update(req.body, {
      where: { notification_id: req.params.notification_id }
    });
    if (updated) {
      const updatedNotification = await Notification.findByPk(req.params.notification_id);
      res.status(200).json(updatedNotification);
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una notificación
export const deleteNotification = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Notification.destroy({
      where: { notification_id: req.params.notification_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Notificación no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
