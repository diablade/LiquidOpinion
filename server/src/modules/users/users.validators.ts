import Joi from 'joi';

export const updateProfileSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(35).optional(),
  firstName: Joi.string().max(50).optional(),
  lastName: Joi.string().max(50).optional(),
  description: Joi.string().max(500).optional(),
  photo: Joi.string().uri().optional(),
}).min(1);

export const updatePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string()
    .min(8)
    .max(72)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .required(),
});

export const adminRoleSchema = Joi.object({
  role: Joi.string().valid('USER', 'ADMIN').required(),
});
