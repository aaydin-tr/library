import { Inject, Service } from "typedi";
import Postgresql from "../service/core/postgresql";
import { Model, ModelStatic } from "sequelize";
import { BookActivities } from "../models/book_activities";

@Service()
export default class BookActivitiesRepository {
  private model: ModelStatic<Model>;
  constructor(@Inject() private readonly postgresql: Postgresql) {
    this.model = this.postgresql.getModel("books_activities");
  }

  public async create(
    user_id: number,
    book_id: number,
    score: number
  ): Promise<BookActivities | Model> {
    return await this.model.create({ user_id, book_id, user_score: score });
  }
}
