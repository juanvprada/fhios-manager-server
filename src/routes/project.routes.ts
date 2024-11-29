import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', authorize(['admin', 'project_manager']), ProjectController.create);
router.get('/:id', authorize(['admin', 'project_manager', 'developer']), ProjectController.getById);
router.put('/:id', authorize(['admin', 'project_manager']), ProjectController.update);
router.get('/:id/metrics', authorize(['admin', 'project_manager']), ProjectController.getMetrics);

export default router;