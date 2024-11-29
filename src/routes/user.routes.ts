import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { authenticateToken } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

router.use(authenticateToken);

router.post('/', authorize(['admin']), UserController.create);
router.get('/:id', authorize(['admin', 'manager']), UserController.getById);
router.put('/:id', authorize(['admin']), UserController.update);
router.delete('/:id', authorize(['admin']), UserController.delete);

export default router;