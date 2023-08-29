import { Inject, Service } from 'typedi';
import ILoader from './ILoader';
import LoggerLoader from './logger-loader';
import PostgresqlLoader from './postgresql-loader';
import ServerLoader from './server-loader';


type Loaders = {
  [key: string]: ILoader;
};

@Service()
export default class ApplicationLoader {
  private loaders: Loaders;

  constructor(
    @Inject() loggerLoader: LoggerLoader,
    @Inject() postgresqlLoader: PostgresqlLoader,
    @Inject() serverLoader: ServerLoader
  ) {
    this.loaders = {
      loggerLoader,
      postgresqlLoader,
      serverLoader,
    };
  }

  public async loadAll(): Promise<void> {
    for (const loader of Object.values(this.loaders)) {
      await loader.load();
    }
  }

  public async destroyAll(): Promise<void> {
    for (const loader of Object.values(this.loaders)) {
      await loader.destroy();
    }
  }

  public async loadByName(name: string) {
    await this.loaders[name].load();
  }

  public async destroyByName(name: string) {
    await this.loaders[name].destroy();
  }
}
