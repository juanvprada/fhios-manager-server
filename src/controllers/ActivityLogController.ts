import { Request, Response } from 'express';
import ActivityLog from '../models/ActivityLogModel';
import { IActivityLog } from '../interfaces/ActivityLogInterface';

// Crear un nuevo registro de actividad
export const createActivityLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const activityLog: IActivityLog = req.body;
    const newActivityLog = await ActivityLog.create(activityLog);
    res.status(201).json(newActivityLog);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todos los registros de actividad
export const getActivityLogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const activityLogs = await ActivityLog.findAll();
    res.status(200).json(activityLogs);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener un registro de actividad por ID
export const getActivityLogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const activityLog = await ActivityLog.findByPk(req.params.log_id);
    if (activityLog) {
      res.status(200).json(activityLog);
    } else {
      res.status(404).json({ message: 'Registro de actividad no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar un registro de actividad
export const updateActivityLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await ActivityLog.update(req.body, {
      where: { log_id: req.params.log_id }
    });
    if (updated) {
      const updatedActivityLog = await ActivityLog.findByPk(req.params.log_id);
      res.status(200).json(updatedActivityLog);
    } else {
      res.status(404).json({ message: 'Registro de actividad no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar un registro de actividad
export const deleteActivityLog = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await ActivityLog.destroy({
      where: { log_id: req.params.log_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Registro de actividad no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
