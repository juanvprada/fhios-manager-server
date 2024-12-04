import { Request, Response } from 'express';
import TimeEntry from '../models/TimeEntryModel';
import { ITimeEntry } from '../interfaces/TimeEntryInterface';

// Crear una nueva entrada de tiempo
export const createTimeEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const timeEntry: ITimeEntry = req.body;
    const newTimeEntry = await TimeEntry.create(timeEntry);
    res.status(201).json(newTimeEntry);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las entradas de tiempo
export const getTimeEntries = async (req: Request, res: Response): Promise<void> => {
  try {
    const timeEntries = await TimeEntry.findAll();
    res.status(200).json(timeEntries);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener una entrada de tiempo por ID
export const getTimeEntryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const timeEntry = await TimeEntry.findByPk(req.params.entry_id);
    if (timeEntry) {
      res.status(200).json(timeEntry);
    } else {
      res.status(404).json({ message: 'Entrada de tiempo no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar una entrada de tiempo
export const updateTimeEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await TimeEntry.update(req.body, {
      where: { entry_id: req.params.entry_id }
    });
    if (updated) {
      const updatedTimeEntry = await TimeEntry.findByPk(req.params.entry_id);
      res.status(200).json(updatedTimeEntry);
    } else {
      res.status(404).json({ message: 'Entrada de tiempo no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una entrada de tiempo
export const deleteTimeEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await TimeEntry.destroy({
      where: { entry_id: req.params.entry_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Entrada de tiempo no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
