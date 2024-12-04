import { Router } from 'express';
import { createActivityLog, getActivityLogs, getActivityLogById, updateActivityLog, deleteActivityLog } from '../controllers/ActivityLogController';

const router = Router();

// Rutas para registros de actividad
router.post('/activity_logs', createActivityLog);
router.get('/activity_logs', getActivityLogs);
router.get('/activity_logs/:log_id', getActivityLogById);
router.put('/activity_logs/:log_id', updateActivityLog);
router.delete('/activity_logs/:log_id', deleteActivityLog);

export default router;
