import { Router } from 'express';
import { createRole, getRoles, getRoleById, updateRole, deleteRole } from '../controllers/RoleController';

const router = Router();

// Rutas para roles
router.post('/roles', createRole);
router.get('/roles', getRoles);
router.get('/roles/:role_id', getRoleById);
router.put('/roles/:role_id', updateRole);
router.delete('/roles/:role_id', deleteRole);

export default router;
