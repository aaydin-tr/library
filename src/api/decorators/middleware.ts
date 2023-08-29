import { RequestHandler } from 'express';
import BaseController from '../controllers/base-controller';

export default function Middleware(middlewares: RequestHandler[]) {
  return function (target: BaseController, propertyKey: string | symbol) {
    Reflect.defineMetadata('preMiddlewares', middlewares, target, propertyKey);
  };
}
