import ILoader from "./ILoader";
import { Inject, Service } from "typedi";
import Postgresql from "../service/core/postgresql";

@Service()
export default class PostgresqlLoader implements ILoader {
  constructor(@Inject() private postgresql: Postgresql) {}

  public async load(): Promise<void> {
    await this.postgresql.connect();
    await this.postgresql.loadModels()
  }

  public async destroy(): Promise<void> {
    await this.postgresql.close();
  }
}
