import { Service } from "typedi";
import * as log4js from "log4js";
import LoggerConfigs from "../../consts/logger-configs";

@Service()
export default class Logger {
  private logger!: log4js.Logger;

  public createLogger(): void {
    this.logger = log4js.getLogger();
  }

  public configureLogger(): void {
    this.logger.level = LoggerConfigs.level;
  }

  public debug(message: string): void {
    this.logger.debug(message);
  }

  public info(message: string): void {
    this.logger.info(message);
  }

  public warn(message: string): void {
    this.logger.warn(message);
  }

  public error(message: string): void {
    this.logger.error(message);
  }

  public fatal(message: string): void {
    this.logger.fatal(message);
  }

  public log(message: string): void {
    this.logger.log(message);
  }

  public trace(message: string): void {
    this.logger.trace(message);
  }
}
