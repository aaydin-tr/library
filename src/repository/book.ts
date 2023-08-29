import { Inject, Service } from "typedi";
import Postgresql from "../service/core/postgresql";
import { Model, ModelStatic } from "sequelize";
import { Book } from "../models/book";

@Service()
export default class BookRepository {
  private model: ModelStatic<Model>;
  constructor(@Inject() private readonly postgresql: Postgresql) {
    this.model = this.postgresql.getModel("books");
  }

  public async create(name: string): Promise<Book | Model> {
    return await this.model.create({ name });
  }

  public async getByName(name: string): Promise<Book | Model | null> {
    return await this.model.findOne({ where: { name } });
  }

  public async getAll(): Promise<Book[] | Model[]> {
    return await this.model.findAll({
      raw: true,
      attributes: ["id", "name"],
      order: [["id", "ASC"]],
    });
  }

  public async getById(
    id: number,
    attributes: string[] = ["id", "name", "score", "user_id"]
  ): Promise<Book | Model | null> {
    return await this.model.findOne({
      where: { id },
      attributes,
    });
  }
}
