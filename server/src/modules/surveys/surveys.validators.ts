import Joi from 'joi';

const candidateSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(1000).optional(),
  imageUrl: Joi.string().uri().optional(),
});

const opinionSchema = Joi.object({
  id: Joi.string().required(),
  label: Joi.string().required(),
  color: Joi.string()
    .pattern(/^#[0-9a-fA-F]{6}$/)
    .required(),
  value: Joi.number().integer().min(0).required(),
});

const archivePolicySchema = Joi.object({
  enabled: Joi.boolean().required(),
  retentionDays: Joi.number().integer().min(1).max(3650).required(),
});

export const createSurveySchema = Joi.object({
  title: Joi.string().max(200).required(),
  slogan: Joi.string().max(300).optional(),
  description: Joi.string().max(5000).required(),
  themes: Joi.array().items(Joi.string().max(50)).max(10).default([]),
  tags: Joi.array().items(Joi.string().max(50)).max(20).default([]),
  candidates: Joi.array().items(candidateSchema).min(2).max(100).optional(),
  opinions: Joi.array().items(opinionSchema).min(2).max(10).optional(),
  visibility: Joi.string().valid('public', 'private', 'unlisted').default('public'),
  typeOfVote: Joi.string().valid('opinion', 'numeric').default('opinion'),
  reVoteDelayMs: Joi.number().integer().min(0).default(86_400_000),
  expireAt: Joi.date().iso().greater('now').optional(),
  archivePolicy: archivePolicySchema.optional(),
});

export const updateSurveySchema = createSurveySchema.fork(
  ['title', 'description'],
  (s) => s.optional(),
).min(1);

export const publishSchema = Joi.object({
  activate: Joi.boolean().required(),
});

export const memberSchema = Joi.object({
  userId: Joi.string().required(),
  role: Joi.string().valid('member', 'editor', 'admin').required(),
});

export const surveyQuerySchema = Joi.object({
  page: Joi.number().integer().min(1).default(1),
  limit: Joi.number().integer().min(1).max(100).default(20),
  tags: Joi.string().optional(),
  search: Joi.string().max(200).optional(),
});
