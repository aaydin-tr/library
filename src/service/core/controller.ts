import { Inject, Service } from "typedi";
import UserController from "../../api/controllers/user";
import Logger from "./logger";
import BookController from "../../api/controllers/book";

@Service()
export default class ControllerService {
  controllers = [UserController, BookController];

  constructor(@Inject() private readonly logger: Logger) {}

  public loadAllController(): void {
    this.logger.info("Controller service is initialized...");
  }
}
