import { Inject, Service } from "typedi";
import BookRepository from "../repository/book";
import { CustomError } from "../types/types";
import HTTPStatuses from "../consts/http-statuses";
import { Book } from "../models/book";

@Service()
export default class BookService {
  constructor(@Inject() private repository: BookRepository) {}

  public async create(name: string) {
    const book = await this.repository.getByName(name);
    if (book) {
      throw new CustomError("Book already exists", HTTPStatuses.BAD_REQUEST);
    }

    const result = (await this.repository.create(name)) as Book;
    return {
      id: result.id,
      name: result.name,
    };
  }

  public async getAll() {
    return await this.repository.getAll();
  }

  public async getById(id: number) {
    const book = await this.repository.getById(id) as Book;
    if (!book) {
      throw new CustomError("Book not found", HTTPStatuses.NOT_FOUND);
    }

    return {
      id: book.id,
      name: book.name,
      score: book.score.toFixed(2),
    }
  }
}
