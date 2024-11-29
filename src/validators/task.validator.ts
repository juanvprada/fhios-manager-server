import Joi from 'joi';
import { AppError } from '../utils/error';

const taskSchema = Joi.object({
  project_id: Joi.number().required(),
  title: Joi.string().required().max(100),
  description: Joi.string().allow(null, ''),
  status: Joi.string().valid('pending', 'in_progress', 'review', 'completed'),
  priority: Joi.string().valid('low', 'medium', 'high', 'urgent'),
  estimated_hours: Joi.number().precision(2).positive().allow(null),
  start_date: Joi.date().allow(null),
  due_date: Joi.date().allow(null).min(Joi.ref('start_date')),
  assigned_to: Joi.number().allow(null),
});

const timeEntrySchema = Joi.object({
  task_id: Joi.number().required(),
  hours_logged: Joi.number().required().precision(2).positive(),
  work_date: Joi.date().required().max('now'),
  description: Joi.string().allow(null, ''),
});

export const validateTask = async (data: any) => {
  try {
    await taskSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new AppError(400, 'Validation error', error.details);
  }
};

export const validateTimeEntry = async (data: any) => {
  try {
    await timeEntrySchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new AppError(400, 'Validation error', error.details);
  }
};