import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

export class ValidationMiddleware {
  static validate(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
          value: detail.context?.value
        }));

        return res.status(422).json({
          error: 'Validation failed',
          details: errors
        });
      }

      req.body = value;
      next();
    };
  }

  static validateQuery(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.query, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
          value: detail.context?.value
        }));

        return res.status(422).json({
          error: 'Query validation failed',
          details: errors
        });
      }

      req.query = value;
      next();
    };
  }

  static validateParams(schema: Joi.ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      const { error, value } = schema.validate(req.params, {
        abortEarly: false,
        stripUnknown: true
      });

      if (error) {
        const errors = error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message,
          value: detail.context?.value
        }));

        return res.status(422).json({
          error: 'Parameter validation failed',
          details: errors
        });
      }

      req.params = value;
      next();
    };
  }
}

export const validate = ValidationMiddleware.validate;
export const validateQuery = ValidationMiddleware.validateQuery;
export const validateParams = ValidationMiddleware.validateParams;