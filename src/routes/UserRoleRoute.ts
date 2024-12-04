import { Router } from 'express';
import { assignRoleToUser, getUserRoles, deleteUserRole } from '../controllers/UserRoleController';

const router = Router();

// Rutas para UserRole
router.post('/user_roles', assignRoleToUser);
router.get('/user_roles', getUserRoles);
router.delete('/user_roles/:user_id/:role_id', deleteUserRole);

export default router;
