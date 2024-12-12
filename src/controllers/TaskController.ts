import { Request, Response } from 'express';
import Task from '../models/TaskModel';
import Project from '../models/ProjectModel';
import { ITask } from '../interfaces/TaskInterface';
import Notification from '../models/NotificationModel';
import { emitNotification } from '../app';

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = parseInt(req.params.projectId);

    // Verificar si el proyecto existe
    const project = await Project.findByPk(projectId);
    if (!project) {
      res.status(404).json({ message: 'Proyecto no encontrado' });
      return;
    }

    const taskData: ITask = {
      ...req.body,
      project_id: projectId,
      status: 'pending'
    };

    const newTask = await Task.create(taskData);

    // Extraer usuarios asignados de la descripción
    const assignedUsersMatch = taskData.description?.match(/<!--ASSIGNED_USERS:(.*?)-->/);
    if (assignedUsersMatch) {
      const userIds = assignedUsersMatch[1].split('|');
      console.log('Usuarios asignados encontrados:', userIds);

      // Crear notificación para cada usuario
      for (const userId of userIds) {
        try {
          const notification = await Notification.create({
            user_id: parseInt(userId),
            title: 'Nueva Tarea Asignada',
            message: `Se te ha asignado una nueva tarea: ${taskData.title} en el proyecto ${project.project_name}`,
            type: 'task_assigned',
            reference_id: newTask.task_id,
            read_status: false
          });

          emitNotification(parseInt(userId), notification);
          console.log(`Notificación enviada al usuario ${userId}`);
        } catch (error) {
          console.error(`Error al crear notificación para usuario ${userId}:`, error);
        }
      }
    }

    // Obtener la tarea creada con sus relaciones
    const taskWithRelations = await Task.findByPk(newTask.task_id, {
      include: [
        {
          model: Project,
          as: 'project'
        }
      ]
    });

    res.status(201).json(taskWithRelations);
  } catch (err) {
    console.error('Error creating task:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las tareas de un proyecto
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const projectId = parseInt(req.params.projectId);

    const tasks = await Task.findAll({
      where: {
        project_id: projectId
      },
      include: [
        {
          model: Project,
          as: 'project'
        }
      ],
      order: [['created_at', 'DESC']]
    });

    res.status(200).json(tasks);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener una tarea por ID
export const getTaskById = async (req: Request, res: Response): Promise<void> => {
  try {
    const task = await Task.findByPk(req.params.task_id, {
      include: [
        {
          model: Project,
          as: 'project'
        }
      ]
    });
    if (task) {
      console.log('Tarea encontrada:', task);
      res.status(200).json(task);
    } else {
      console.log('Tarea no encontrada');
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    console.error('Error al obtener tarea:', err);
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar una tarea
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const oldTask = await Task.findByPk(req.params.task_id);
    const [updated] = await Task.update(req.body, {
      where: { task_id: req.params.task_id }
    });

    if (updated) {
      const updatedTask = await Task.findByPk(req.params.task_id);

      // Si se cambió el usuario asignado, obtener el proyecto y enviar notificación
      if (updatedTask && req.body.assigned_to && (!oldTask?.assigned_to || oldTask.assigned_to !== req.body.assigned_to)) {
        // Obtener el proyecto de manera independiente
        const projectId = updatedTask.project_id;
        if (projectId) {
          const project = await Project.findByPk(projectId);

          try {
            const notification = await Notification.create({
              user_id: req.body.assigned_to,
              title: 'Tarea Asignada',
              message: `Se te ha asignado la tarea: ${updatedTask.title} ${project ? `en el proyecto ${project.project_name}` : ''}`,
              type: 'task_assigned',
              reference_id: updatedTask.task_id,
              read_status: false
            });

            emitNotification(req.body.assigned_to, notification);
            console.log(`Notificación enviada al usuario ${req.body.assigned_to}`);
          } catch (error) {
            console.error('Error al crear notificación:', error);
          }
        }
      }

      const taskWithRelations = await Task.findByPk(updatedTask?.task_id, {
        include: [
          {
            model: Project,
            as: 'project'
          }
        ]
      });

      res.status(200).json(taskWithRelations);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una tarea
export const deleteTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Task.destroy({
      where: { task_id: req.params.task_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};