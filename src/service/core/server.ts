import Container, { Inject, Service } from "typedi";
import Logger from "./logger";
import Express, {
  Application,
  json,
  NextFunction,
  Request,
  Response,
  urlencoded,
} from "express";
import { Server } from "http";
import helmet from "helmet";
import HTTPStatuses from "../../consts/http-statuses";
import { CustomError, Routes, Target } from "../../types/types";
import "express-async-errors";
import WebServerConfigs from '../../consts/web-server-configs';

@Service()
export default class WebServer {
  private expressApp!: Application;
  private server!: Server;

  constructor(
    @Inject() private readonly logger: Logger,
    @Inject("routes") private routes: Routes
  ) {}

  public createApp() {
    this.logger.info("Creating Express app");
    this.expressApp = Express();
    this.logger.info("Express app created");
  }

  public configureApp() {
    this.expressApp.use(json());
    this.expressApp.use(urlencoded({ extended: true }));
    this.expressApp.use(helmet());
  }

  public configureExceptionHandler() {
    this.logger.info("Configuring Express exception handler");
    this.expressApp.use(
      (error: Error, req: Request, res: Response, _: NextFunction) => {
        this.logger.fatal(`${error.message}, PATH: ${req.path}`);
        const status =
          (error as CustomError)?.status || HTTPStatuses.INTERNAL_SERVER_ERROR;

        res.status(status).send({
          error: error.message,
          status,
        });
      }
    );
    this.logger.info("Express exception handler configured");
  }

  public defineBaseRoute() {
    this.expressApp.get("/", (_: Request, res: Response) => {
      res.send(" Hello World! ");
    });
  }

  public prepareRoutes() {
    this.logger.info("Preparing routes");
    this.routes.forEach((route) => {
      const app = this.expressApp as any;
      app[route.method](
        route.path,
        route.preMiddlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          const instance = Container.get(route.target) as Target;
          const response = await instance[route.methodName].bind(instance)(
            req,
            res,
            next
          );

          if (response && Object.values(HTTPStatuses).includes(response)) {
            res.status(response);
            res.send();
          } else if (response) {
            res.send(response);
          }

          if (route.postMiddlewares) next();
        },
        route.postMiddlewares
      );
    });
    this.logger.info("Routes prepared");
  }

  public start() {
    this.logger.info("Starting Express server");
    try {
      const { port } = WebServerConfigs;
      this.server = this.expressApp.listen(port, () => {
        this.logger.info(`Express server started on port ${port}`);
      });
    } catch (error: any) {
      this.logger.fatal(`Express server failed to start: ${error.message}`);
    }
  }

  public close() {
    this.logger.info("Closing Express server");
    this.server.close();
    this.logger.info("Express server closed");
  }
}
