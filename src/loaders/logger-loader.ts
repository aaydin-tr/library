import ILoader from "./ILoader";
import { Inject, Service } from "typedi";
import Logger from "../service/core/logger";

@Service()
export default class LoggerLoader implements ILoader {
  constructor(@Inject() private logger: Logger) {}

  public async load(): Promise<void> {
    this.logger.createLogger();
    this.logger.configureLogger();
  }

  public async destroy(): Promise<void> {
    // nothing to do here
  }
}
