import { Request, Response } from 'express';
import Document from '../models/DocumentModel';
import { IDocument } from '../interfaces/DocumentInterface';

// Crear un nuevo documento
export const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const document: IDocument = req.body;
    const newDocument = await Document.create(document);
    res.status(201).json(newDocument);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener todos los documentos
export const getDocuments = async (req: Request, res: Response): Promise<void> => {
  try {
    const documents = await Document.findAll();
    res.status(200).json(documents);
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Obtener un documento por ID
export const getDocumentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await Document.findByPk(req.params.document_id);
    if (document) {
      res.status(200).json(document);
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Actualizar un documento
export const updateDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const [updated] = await Document.update(req.body, {
      where: { document_id: req.params.document_id }
    });
    if (updated) {
      const updatedDocument = await Document.findByPk(req.params.document_id);
      res.status(200).json(updatedDocument);
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};

// Eliminar un documento
export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const deleted = await Document.destroy({
      where: { document_id: req.params.document_id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ message: 'Documento no encontrado' });
    }
  } catch (err) {
    res.status(500).json({ message: (err as Error).message });
  }
};
