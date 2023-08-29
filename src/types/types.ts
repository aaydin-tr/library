import { RequestHandler } from "express";

export type Target = any;

export type Route = {
  path: string;
  method: string;
  methodName: string;
  target: Target;
  preMiddlewares: RequestHandler[];
  postMiddlewares: RequestHandler[];
};

export type Routes = Route[];

export class CustomError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
  }
}
