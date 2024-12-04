import { Router } from 'express';
import { createKnowledgeBaseEntry, getKnowledgeBaseEntries, getKnowledgeBaseEntryById, updateKnowledgeBaseEntry, deleteKnowledgeBaseEntry } from '../controllers/KnowledgeBaseController';

const router = Router();

// Rutas para la base de conocimiento
router.post('/knowledge_base', createKnowledgeBaseEntry);
router.get('/knowledge_base', getKnowledgeBaseEntries);
router.get('/knowledge_base/:kt_id', getKnowledgeBaseEntryById);
router.put('/knowledge_base/:kt_id', updateKnowledgeBaseEntry);
router.delete('/knowledge_base/:kt_id', deleteKnowledgeBaseEntry);

export default router;
