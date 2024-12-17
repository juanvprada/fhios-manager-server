import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';
import { AuthMiddleware } from '../middleware/auth';

const router = Router();

// Rutas para usuarios
router.post('/users', createUser);
router.get('/users', AuthMiddleware, getUsers);
router.get('/users/:user_id', AuthMiddleware, getUserById);
router.put('/users/:user_id', AuthMiddleware, updateUser);
router.delete('/users/:user_id', AuthMiddleware, deleteUser);

export default router;