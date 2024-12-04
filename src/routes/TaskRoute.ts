import { Router } from 'express';
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from '../controllers/TaskController';

const router = Router();

// Rutas para tareas
router.post('/tasks', createTask);
router.get('/tasks', getTasks);
router.get('/tasks/:task_id', getTaskById);
router.put('/tasks/:task_id', updateTask);
router.delete('/tasks/:task_id', deleteTask);

export default router;
