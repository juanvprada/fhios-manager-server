import { Request, Response, NextFunction } from 'express';
import { DocumentService } from '../services/document.service';
import { validateDocument } from '../validators/document.validator';

export class DocumentController {
  static async upload(req: Request, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        throw new AppError(400, 'No file uploaded');
      }

      await validateDocument(req.body);
      const document = await DocumentService.uploadDocument(
        req.file,
        req.body,
        req.user.id
      );
      res.status(201).json(document);
    } catch (error) {
      next(error);
    }
  }

  static async delete(req: Request, res: Response, next: NextFunction) {
    try {
      await DocumentService.deleteDocument(Number(req.params.id), req.user.id);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}