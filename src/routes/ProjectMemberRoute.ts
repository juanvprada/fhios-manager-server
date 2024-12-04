import { Router } from 'express';
import { addProjectMember, getProjectMembers, removeProjectMember } from '../controllers/ProjectMemberController';

const router = Router();

// Rutas para miembros de proyectos
router.post('/project_members', addProjectMember);
router.get('/project_members/:project_id', getProjectMembers);
router.delete('/project_members/:project_id/:user_id', removeProjectMember);

export default router;
