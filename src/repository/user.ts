import { Inject, Service } from "typedi";
import Postgresql from "../service/core/postgresql";
import { Model, ModelStatic } from "sequelize";
import { User } from "../models/user";
import { BookActivities } from "../models/book_activities";

@Service()
export default class UserRepository {
  private model: ModelStatic<Model>;
  constructor(@Inject() private readonly postgresql: Postgresql) {
    this.model = this.postgresql.getModel("users");
  }

  public async create(name: string) {
    return await this.model.create({ name });
  }

  public async getAll(): Promise<User[] | Model[]> {
    return await this.model.findAll({ raw: true, attributes: ["id", "name"] });
  }

  public async getById<T>(id: number): Promise<User | Model | null> {
    return await this.model.findOne({
      where: { id },
      attributes: ["id", "name"],
      include: ["books", { association: "books_activities", include: ["book"] }],
    });
  }

  public async getByName(name: string): Promise<User | Model | null> {
    return await this.model.findOne({ where: { name } });
  }
}
