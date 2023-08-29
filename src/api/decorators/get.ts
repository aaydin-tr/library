import { createPath } from '../../utils';
import BaseController from '../controllers/base-controller';

export default function Get(path?: string) {
  return function (target: BaseController, key: string) {
    const routePath = createPath(path) || createPath(key);

    Reflect.defineMetadata('path', routePath, target, key);
    Reflect.defineMetadata('method', 'get', target, key);
  };
}
