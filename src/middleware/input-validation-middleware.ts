import { validationResult } from "express-validator"
import { NextFunction, Request, Response } from 'express'

export function inputValidationMiddleware(req: Request<any>, res: Response, next: NextFunction) {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  next()
}
