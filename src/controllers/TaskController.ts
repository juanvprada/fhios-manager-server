import { Request, Response } from 'express';
import Task from '../models/TaskModel';
import { ITask } from '../interfaces/TaskInterface';

// Crear una nueva tarea
export const createTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const task: ITask = req.body;
    const newTask = await Task.create(task);
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las tareas
export const getTasks = async (req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (err) {
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
