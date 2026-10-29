import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

type Source = 'body' | 'query' | 'params';

export function validate(schema: Joi.ObjectSchema, source: Source = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const { error, value } = schema.validate(req[source], {
      abortEarly: false,
      stripUnknown: true,
      convert: true,
    });
    if (error) {
      res.status(422).json({
        message: 'Validation failed',
        errors: error.details.map((d) => ({ field: d.path.join('.'), message: d.message })),
      });
      return;
    }
    req[source] = value;
    next();
  };
}
