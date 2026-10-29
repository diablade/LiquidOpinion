import Joi from 'joi';

export const castVoteSchema = Joi.object({
  surveyId: Joi.string().required(),
  candidateId: Joi.string().required(),
  opinionId: Joi.string().required(),
});

export const tallyQuerySchema = Joi.object({
  surveyId: Joi.string().required(),
});
