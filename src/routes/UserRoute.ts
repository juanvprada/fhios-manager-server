import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUser, deleteUser } from '../controllers/UserController';
import { verifyToken } from '../middleware/auth';

const router = Router();

// Rutas para usuarios
router.post('/users', createUser);
router.get('/users', verifyToken, getUsers);
router.get('/users/:user_id', verifyToken, getUserById);
router.put('/users/:user_id', verifyToken, updateUser);
router.delete('/users/:user_id', verifyToken, deleteUser);

export default router;