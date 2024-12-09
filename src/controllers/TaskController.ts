import { Request, Response } from 'express';
import Task from '../models/TaskModel';
import Project from '../models/ProjectModel';
import { ITask } from '../interfaces/TaskInterface';

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
    const task = await Task.findByPk(req.params.task_id);
    if (task) {
      res.status(200).json(task);
    } else {
      res.status(404).json({ message: 'Tarea no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar una tarea
export const updateTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Task.update(req.body, {
      where: { task_id: req.params.task_id }
    });
    if (updated) {
      const updatedTask = await Task.findByPk(req.params.task_id);
      res.status(200).json(updatedTask);
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
