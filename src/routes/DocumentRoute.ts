import { Router } from 'express';
import { createDocument, getDocuments, getDocumentById, updateDocument, deleteDocument } from '../controllers/DocumentController';

const router = Router();

// Rutas para documentos
router.post('/documents', createDocument);
router.get('/documents', getDocuments);
router.get('/documents/:document_id', getDocumentById);
router.put('/documents/:document_id', updateDocument);
router.delete('/documents/:document_id', deleteDocument);

export default router;
