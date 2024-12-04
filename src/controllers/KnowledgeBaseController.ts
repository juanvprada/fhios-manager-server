import { Request, Response } from 'express';
import KnowledgeBase from '../models/KnowledgeBaseModel';
import { IKnowledgeBase } from '../interfaces/KnowledgeBaseInterface';

// Crear una nueva entrada en la base de conocimiento
export const createKnowledgeBaseEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const knowledgeBase: IKnowledgeBase = req.body;
    const newKnowledgeBase = await KnowledgeBase.create(knowledgeBase);
    res.status(201).json(newKnowledgeBase);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todas las entradas de la base de conocimiento
export const getKnowledgeBaseEntries = async (req: Request, res: Response): Promise<void> => {
  try {
    const knowledgeBaseEntries = await KnowledgeBase.findAll();
    res.status(200).json(knowledgeBaseEntries);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener una entrada de la base de conocimiento por ID
export const getKnowledgeBaseEntryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const knowledgeBaseEntry = await KnowledgeBase.findByPk(req.params.kt_id);
    if (knowledgeBaseEntry) {
      res.status(200).json(knowledgeBaseEntry);
    } else {
      res.status(404).json({ message: 'Entrada de la base de conocimiento no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar una entrada de la base de conocimiento
export const updateKnowledgeBaseEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await KnowledgeBase.update(req.body, {
      where: { kt_id: req.params.kt_id }
    });
    if (updated) {
      const updatedKnowledgeBase = await KnowledgeBase.findByPk(req.params.kt_id);
      res.status(200).json(updatedKnowledgeBase);
    } else {
      res.status(404).json({ message: 'Entrada de la base de conocimiento no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar una entrada de la base de conocimiento
export const deleteKnowledgeBaseEntry = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await KnowledgeBase.destroy({
      where: { kt_id: req.params.kt_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Entrada de la base de conocimiento no encontrada' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
