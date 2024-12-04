import { Router } from 'express';
import { createProject, getProjects, getProjectById, updateProject, deleteProject } from '../controllers/ProjectController';

const router = Router();

// Rutas para proyectos
router.post('/projects', createProject);
router.get('/projects', getProjects);
router.get('/projects/:project_id', getProjectById);
router.put('/projects/:project_id', updateProject);
router.delete('/projects/:project_id', deleteProject);

export default router;
