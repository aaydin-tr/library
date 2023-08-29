import { Inject, Service } from "typedi";
import Postgresql from "../service/core/postgresql";
import { Model, ModelStatic } from "sequelize";
import { BookActivities } from "../models/book_activities";
import BookActivitiesRepository from "../repository/book_activities";

@Service()
export default class BookActivitiesService {
  constructor(@Inject() private repository: BookActivitiesRepository) {}

  public async create(user_id: number, book_id: number, score: number) {
    return await this.repository.create(user_id, book_id, score);
  }
}
