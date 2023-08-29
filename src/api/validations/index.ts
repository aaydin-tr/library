import { NextFunction, Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

const ValidationCache = new Map();

export default function validate(validations: ValidationChain[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const key = req.originalUrl + req.method;
    const routeVaildationCache = ValidationCache.get(key);
    if (routeVaildationCache != null) {
      validations = routeVaildationCache;
    } else {
      validations = validations.flat(Infinity);
      ValidationCache.set(key, validations);
    }

    await Promise.all(validations.map((validation) => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
}
