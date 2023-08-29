import { RequestHandler } from 'express';
import BaseController from '../controllers/base-controller';

export default function PostMiddleware(middlewares: RequestHandler[]) {
  return function (target: BaseController, propertyKey: string | symbol) {
    Reflect.defineMetadata('postMiddlewares', middlewares, target, propertyKey);
  };
}
