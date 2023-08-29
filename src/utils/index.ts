import { NextFunction, Request, Response } from 'express';

export function createPath(str?: string) {
  if (str && str[0] !== '/') {
    return '/' + str;
  }
  return str;
}

export function emptyMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next();
}
