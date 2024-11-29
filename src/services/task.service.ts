import { Task, TimeEntry } from '../models/task.model';
import { User } from '../models/user.model';
import { Project } from '../models/project.model';
import { AppError } from '../utils/error';
import { sequelize } from '../config/database';
import { NotificationService } from './notification.service';

export class TaskService {
  static async createTask(taskData: any, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const task = await Task.create(
        {
          ...taskData,
          created_by: userId,
        },
        { transaction }
      );

      // Notificar al usuario asignado
      if (taskData.assigned_to) {
        await NotificationService.createNotification({
          user_id: taskData.assigned_to,
          title: 'Nueva tarea asignada',
          message: `Se te ha asignado la tarea: ${taskData.title}`,
          type: 'info',
          reference_id: task.task_id,
        });
      }

      await transaction.commit();
      return this.getTaskById(task.task_id);
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async updateTaskStatus(taskId: number, status: string, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const task = await Task.findByPk(taskId);
      if (!task) {
        throw new AppError(404, 'Task not found');
      }

      await task.update({ status }, { transaction });

      // Notificar al creador de la tarea
      await NotificationService.createNotification({
        user_id: task.created_by,
        title: 'Actualización de estado de tarea',
        message: `La tarea ${task.title} ha sido actualizada a ${status}`,
        type: 'info',
        reference_id: taskId,
      });

      await transaction.commit();
      return task;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async logTime(timeData: any, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const timeEntry = await TimeEntry.create(
        {
          ...timeData,
          user_id: userId,
        },
        { transaction }
      );

      // Notificar al project manager
      const task = await Task.findByPk(timeData.task_id, {
        include: [{ model: Project }],
      });

      if (task) {
        await NotificationService.createNotification({
          user_id: task.Project.created_by,
          title: 'Nuevo registro de tiempo',
          message: `Se ha registrado tiempo en la tarea: ${task.title}`,
          type: 'info',
          reference_id: timeEntry.entry_id,
        });
      }

      await transaction.commit();
      return timeEntry;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async approveTime(entryId: number, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const timeEntry = await TimeEntry.findByPk(entryId);
      if (!timeEntry) {
        throw new AppError(404, 'Time entry not found');
      }

      await timeEntry.update(
        {
          status: 'approved',
          approved_by: userId,
          approved_at: new Date(),
        },
        { transaction }
      );

      await transaction.commit();
      return timeEntry;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}