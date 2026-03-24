import type { Request, Response, NextFunction } from 'express';
import { z, ZodError } from 'zod';

export const validate = (schema: z.ZodTypeAny) => 
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const validated = await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      res.locals.validated = validated;
      
      next();
    } catch (error: any) {
      if (error instanceof ZodError) {
        return res.status(400).json({
          status: 'error',
          errors: error.issues.map(issue => ({
            path: issue.path.length > 1 ? issue.path.slice(1).join('.') : issue.path[0],
            message: issue.message
          }))
        });
      }
      next(error);
    }
  };