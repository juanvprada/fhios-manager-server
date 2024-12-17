import { Router } from 'express';
import { 
  createRole, 
  getRoles, 
  getRoleById, 
  updateRole, 
  deleteRole,
  getUserRoles,      // Nuevo controlador
  updateUserRoles    // Nuevo controlador
} from '../controllers/RoleController';

const router = Router();

// Rutas existentes para roles
router.post('/roles', createRole);
router.get('/roles', getRoles);
router.get('/roles/:role_id', getRoleById);
router.put('/roles/:role_id', updateRole);
router.delete('/roles/:role_id', deleteRole);

// Nuevas rutas para roles de usuario
router.get('/roles/user/:user_id', getUserRoles);
router.put('/roles/user/:user_id', updateUserRoles);

export default router;
