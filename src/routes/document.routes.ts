import { Router } from 'express';
import multer from 'multer';
import { DocumentController } from '../controllers/document.controller';
import { KnowledgeBaseController } from '../controllers/knowledge-base.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

router.use(authenticateToken);

// Rutas de documentos
router.post(
  '/upload',
  authorize(['admin', 'project_manager', 'developer']),
  upload.single('file'),
  DocumentController.upload
);
router.delete('/:id', authorize(['admin', 'project_manager']), DocumentController.delete);

// Rutas de base de conocimientos
router.post('/kb', authorize(['admin', 'project_manager', 'developer']), KnowledgeBaseController.create);
router.get('/kb/search', authorize(['admin', 'project_manager', 'developer']), KnowledgeBaseController.search);

export default router;