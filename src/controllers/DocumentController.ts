import { Request, Response } from 'express';
import { PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { s3Client } from '../config/s3.config';
import Document from '../models/DocumentModel';

export const createDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task_id } = req.params;
    const { title } = req.body;
    const file = req.file;
    const userId = (req as any).user?.userId;

    if (!userId) {
      res.status(401).json({ message: 'Usuario no autenticado' });
      return;
    }

    if (!file) {
      res.status(400).json({ message: 'No se ha subido ningún archivo' });
      return;
    }

    // Crear la clave para S3
    const s3Key = `tasks/${task_id}/documents/${Date.now()}-${file.originalname}`;

    try {
      // Subir a S3
      await s3Client.send(new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: s3Key,
        Body: file.buffer,
        ContentType: file.mimetype,
      }));

      // Crear documento en la base de datos
      const document = await Document.create({
        task_id: parseInt(task_id),
        title,
        file_path: s3Key,
        file_type: file.mimetype,
        uploaded_by: userId
      });

      const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: s3Key
      });

      const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

      res.status(201).json({
        ...document.toJSON(),
        signedUrl
      });
    } catch (error) {
      console.error('Error al subir a S3:', error);
      res.status(500).json({ message: 'Error al subir el archivo a S3' });
      return;
    }
  } catch (error) {
    console.error('Error al crear documento:', error);
    res.status(500).json({ message: 'Error al crear el documento' });
  }
};

export const getDocumentById = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await Document.findByPk(req.params.document_id);

    if (!document) {
      res.status(404).json({ message: 'Documento no encontrado' });
      return;
    }

    // Generar URL firmada de S3
    const command = new GetObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: document.file_path
    });

    const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });

    res.json({
      document,
      signedUrl
    });
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({ message: 'Error al obtener el documento' });
  }
};

export const getDocumentsByTaskId = async (req: Request, res: Response): Promise<void> => {
  try {
    const { task_id } = req.params;
    const documents = await Document.findAll({
      where: { task_id }
    });

    // Generar URLs firmadas para todos los documentos
    const documentsWithUrls = await Promise.all(
      documents.map(async (document) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: document.file_path
        });
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return {
          ...document.toJSON(),
          signedUrl
        };
      })
    );

    res.json(documentsWithUrls);
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ message: 'Error al obtener los documentos' });
  }
};

export const deleteDocument = async (req: Request, res: Response): Promise<void> => {
  try {
    const document = await Document.findByPk(req.params.document_id);

    if (!document) {
      res.status(404).json({ message: 'Documento no encontrado' });
      return;
    }

    // Eliminar de S3
    await s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: document.file_path
    }));

    // Eliminar de la base de datos
    await document.destroy();

    res.status(204).send();
  } catch (error) {
    console.error('Error al eliminar documento:', error);
    res.status(500).json({ message: 'Error al eliminar el documento' });
  }
};