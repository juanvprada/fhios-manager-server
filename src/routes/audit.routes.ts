import { Router } from 'express';
import { AuditController } from '../controllers/audit.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

router.use(authenticateToken);
router.use(authorize(['admin']));

router.get('/activity', AuditController.getActivityLogs);
router.get('/metrics', AuditController.getMetrics);

export default router;