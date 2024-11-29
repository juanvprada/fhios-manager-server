import { Router } from 'express';
import { TaskController } from '../controllers/task.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

router.use(authenticateToken);

// Rutas de tareas
router.post('/', authorize(['admin', 'project_manager']), TaskController.create);
router.patch('/:id/status', authorize(['admin', 'project_manager', 'developer']), TaskController.updateStatus);

// Rutas de registro de tiempo
router.post('/time', authorize(['admin', 'project_manager', 'developer']), TaskController.logTime);
router.post('/time/:entryId/approve', authorize(['admin', 'project_manager']), TaskController.approveTime);

export default router;