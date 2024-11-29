import Joi from 'joi';
import { AppError } from '../utils/error';

const userSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  roles: Joi.array().items(Joi.number()).min(1),
  status: Joi.string().valid('active', 'inactive'),
});

export const validateUser = async (data: any) => {
  try {
    await userSchema.validateAsync(data, { abortEarly: false });
  } catch (error) {
    throw new AppError(400, 'Validation error', error.details);
  }
};