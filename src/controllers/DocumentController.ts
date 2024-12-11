import { Request, Response } from 'express';
import multer from 'multer';
import Document from '../models/DocumentModel';
import { IDocument } from '../interfaces/DocumentInterface';

// Configurar el almacenamiento de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// Crear una instancia de Multer con la configuración de almacenamiento
const upload = multer({ storage });

// Crear un nuevo documento
export const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task_id } = req.params;
    if (!req.file) {
      res.status(400).json({ message: 'No se ha subido ningún archivo' });
      return;
    }

    const document: IDocument = {
      task_id: parseInt(task_id),
      title: req.body.title,
      file_path: `uploads/${req.file.filename}`,
      file_type: req.file.mimetype,
      uploaded_by: req.body.uploaded_by
    };

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