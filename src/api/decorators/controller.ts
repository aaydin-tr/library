import { RequestHandler } from 'express';
import Container, { Service } from 'typedi';
import { Routes, Target } from '../../types/types';
import { emptyMiddleware } from '../../utils/index';

export default function Controller(prefix: string) {
  return function (target: Target) {
    Service()(target);

    for (const value of Object.getOwnPropertyNames(target.prototype)) {
      const path = Reflect.getMetadata('path', target.prototype, value);
      const method = Reflect.getMetadata('method', target.prototype, value);
      const routePath = path === 'constructor' ? prefix : `${prefix}${path}`;
      const preMiddlewares: RequestHandler[] =
        Reflect.getMetadata('preMiddlewares', target.prototype, value) ||
        emptyMiddleware;
      const postMiddlewares: RequestHandler[] =
        Reflect.getMetadata('postMiddlewares', target.prototype, value) ||
        emptyMiddleware;

      let routes: Routes = [];
      try {
        routes = Container.get('routes') || [];
      } catch (e) {
        // Nothing to do
      }
      if (path) {
        routes.push({
          path: routePath,
          methodName: value,
          method,
          target,
          preMiddlewares,
          postMiddlewares,
        });
        Container.set('routes', routes);
      }
    }
  };
}
