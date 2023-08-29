import { Inject } from "typedi";
import BookService from "../../service/book";
import Controller from "../decorators/controller";
import Post from "../decorators/post";
import { Request } from "express";
import Get from "../decorators/get";
import Middleware from "../decorators/middleware";
import bookCreateValidator from "../validations/book-create";
import getByIdValidator from "../validations/get-by-id";
import HTTPStatuses from "../../consts/http-statuses";

@Controller("/books")
export default class BookController {
  constructor(@Inject() private service: BookService) {}

  @Get("/")
  public async getAll() {
    return await this.service.getAll();
  }

  @Post("/")
  @Middleware([bookCreateValidator])
  public async create(req: Request) {
    const { name } = req.body;
    await this.service.create(name);

    return HTTPStatuses.CREATED;
  }

  @Get("/:id")
  @Middleware([getByIdValidator])
  public async getById(req: Request) {
    const { id } = req.params;
    return await this.service.getById(Number(id));
  }
}
