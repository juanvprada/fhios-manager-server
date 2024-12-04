import { Router } from 'express';
import { createTimeEntry, getTimeEntries, getTimeEntryById, updateTimeEntry, deleteTimeEntry } from '../controllers/TimeEntryController';

const router = Router();

// Rutas para entradas de tiempo
router.post('/time_entries', createTimeEntry);
router.get('/time_entries', getTimeEntries);
router.get('/time_entries/:entry_id', getTimeEntryById);
router.put('/time_entries/:entry_id', updateTimeEntry);
router.delete('/time_entries/:entry_id', deleteTimeEntry);

export default router;
