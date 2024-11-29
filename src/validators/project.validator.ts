import Joi from 'joi';
import { AppError } from '../utils/error';

const projectSchema = Joi.object({
  project_name: Joi.string().required().max(100),
  description: Joi.string().allow(null, ''),
  methodology: Joi.string().valid('scrum', 'kanban', 'waterfall').required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().allow(null).min(Joi.ref('start_date')),
  status: Joi.string().valid('planning', 'active', 'on_hold', 'completed'),
  members: Joi.array().items(
    Joi.object({
      user_id: Joi.number().required(),
      role_id: Joi.number().required(),
    })
  ),
});

export const validateProject = async (data: any) => {
  try {
    await projectSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new AppError(400, 'Validation error', error.details);
  }
};