import express from 'express';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../controllers/DocumentController';
import multer from 'multer';

const router = express.Router();

// Middleware de Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

// Definir las rutas
router.post('/documents', upload.single('file'), createDocument);
router.get('/documents', getDocuments);
router.get('/documents/:document_id', getDocumentById);
router.put('/documents/:document_id', updateDocument);
router.delete('/documents/:document_id', deleteDocument);

export default router;
