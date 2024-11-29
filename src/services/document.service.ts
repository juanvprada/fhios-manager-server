import { Document } from '../models/document.model';
import { AppError } from '../utils/error';
import { uploadFile, deleteFile } from '../utils/storage';
import { NotificationService } from './notification.service';

export class DocumentService {
  static async uploadDocument(file: Express.Multer.File, documentData: any, userId: number) {
    const transaction = await sequelize.transaction();

    try {
      const filePath = await uploadFile(file);

      const document = await Document.create(
        {
          ...documentData,
          file_path: filePath,
          file_type: file.mimetype,
          uploaded_by: userId,
        },
        { transaction }
      );

      // Notificar a los miembros del proyecto
      await NotificationService.createNotification({
        project_id: documentData.project_id,
        title: 'Nuevo documento',
        message: `Se ha subido un nuevo documento: ${documentData.title}`,
        type: 'info',
        reference_id: document.document_id,
      });

      await transaction.commit();
      return document;
    } catch (error) {
      await transaction.rollback();
      if (file) {
        await deleteFile(file.path);
      }
      throw error;
    }
  }

  static async deleteDocument(documentId: number, userId: number) {
    const document = await Document.findByPk(documentId);
    
    if (!document) {
      throw new AppError(404, 'Document not found');
    }

    await deleteFile(document.file_path);
    await document.destroy();
  }
}
