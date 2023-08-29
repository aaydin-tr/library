import ILoader from "./ILoader";
import { Inject, Service } from "typedi";
import WebServer from "../service/core/server";
import ControllerService from '../service/core/controller';

@Service()
export default class ServerLoader implements ILoader {
  constructor(
    @Inject() private server: WebServer,
    @Inject() private controller: ControllerService
  ) {}

  public async load(): Promise<void> {
    this.server.createApp();
    this.server.configureApp();
    this.server.defineBaseRoute();
    this.controller.loadAllController();
    this.server.prepareRoutes();
    this.server.configureExceptionHandler();
    this.server.start();
  }

  public async destroy(): Promise<void> {
    this.server.close();
  }
}
