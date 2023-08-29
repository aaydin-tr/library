import { Service, Inject } from "typedi";
import { Model, ModelStatic, Sequelize } from "sequelize";
import { readdirSync } from "fs";
import Logger from "./logger";
import DBConfigs from "../../consts/db-config";

@Service()
export default class Postgresql {
  private sequelize!: Sequelize;
  private models: { [key: string]: ModelStatic<Model> } = {};

  constructor(@Inject() private logger: Logger) {}

  public async connect() {
    try {
      this.sequelize = new Sequelize({
        dialect: "postgres",
        logging: false,
        ...DBConfigs,
      });
      await this.sequelize.authenticate();
      this.logger.info("Postgresql connected");
    } catch (error) {
      throw error;
    }
  }

  public getConnection() {
    return this.sequelize;
  }

  public async close() {
    await this.sequelize.close();
  }

  public async loadModels() {
    const modelsPath = `${__dirname}/../../models`;
    const modelFiles = readdirSync(modelsPath);
    for (const modelFile of modelFiles) {
      const model = require(`${modelsPath}/${modelFile}`).default;
      const schema = this.sequelize.define(model.tableName, model.attributes);

      await schema.sync();
      this.models[model.tableName] = schema;
    }

    for (const modelFile of modelFiles) {
      const model = require(`${modelsPath}/${modelFile}`).default;
      if (model.assocs) {
        const schema = this.models[model.tableName];
        for (const [assocType, data] of Object.entries(model.assocs)) {
          const assocDatas = data as any;
          switch (assocType) {
            case "belongsTo":
              assocDatas.forEach((assocData: any) => {
                schema.belongsTo(this.models[assocData.model], {
                  foreignKey: assocData.foreignKey,
                });
              });

              break;
            case "hasMany":
              assocDatas.forEach((assocData: any) => {
                schema.hasMany(this.models[assocData.model], {
                  foreignKey: assocData.foreignKey,
                });
              });
              break;
          }
        }
      }
    }
  }

  public getModel(name: string): ModelStatic<Model> {
    return this.models[name];
  }
}
