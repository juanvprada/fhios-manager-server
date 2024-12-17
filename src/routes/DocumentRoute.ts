import express, { Request, Response, NextFunction } from 'express';
import { 
    createDocument, 
    getDocumentById, 
    getDocumentsByTaskId, 
    deleteDocument 
} from '../controllers/DocumentController';
import multer, { FileFilterCallback } from 'multer';
import { AuthMiddleware } from '../middleware/auth';

const router = express.Router();

// Configurar multer para almacenar en memoria
const storage = multer.memoryStorage();
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    },
    fileFilter: (
        req: Express.Request, 
        file: Express.Multer.File, 
        callback: FileFilterCallback
    ) => {
        const allowedMimes = [
            'image/jpeg',
            'image/png',
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
        ];

        if (allowedMimes.includes(file.mimetype)) {
            callback(null, true);
        } else {
            callback(new Error('Tipo de archivo no permitido'));
        }
    }
});

// Middleware de manejo de errores para multer
const handleMulterError = (
    error: any, 
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ 
                message: 'El archivo excede el tamaño máximo permitido (5MB)' 
            });
        }
        return res.status(400).json({ 
            message: 'Error al subir el archivo' 
        });
    }
    if (error) {
        return res.status(400).json({ 
            message: error.message || 'Error desconocido al subir el archivo' 
        });
    }
    next();
};

// Rutas
router.post('/tasks/:task_id/documents', 
    AuthMiddleware,
    (req: Request, res: Response, next: NextFunction) => {
        upload.single('file')(req, res, (err: any) => {
            if (err) {
                handleMulterError(err, req, res, next);
            } else {
                next();
            }
        });
    },
    createDocument
);

router.get('/tasks/:task_id/documents', 
    AuthMiddleware,
    getDocumentsByTaskId
);

router.get('/documents/:document_id', 
    AuthMiddleware,
    getDocumentById
);

router.delete('/documents/:document_id', 
    AuthMiddleware,
    deleteDocument
);

export default router;
