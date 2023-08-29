import { Inject } from "typedi";
import UserService from "../../service/user";
import Controller from "../decorators/controller";
import Post from "../decorators/post";
import { Request, Response } from "express";
import Get from "../decorators/get";
import Middleware from "../decorators/middleware";
import userCreateValidation from "../validations/user-create";
import getByIdValidation from "../validations/get-by-id";
import userBorrowBookValidator from "../validations/user-borrow-book";
import userReturnBookValidator from "../validations/user-return-book";
import HTTPStatuses from "../../consts/http-statuses";

@Controller("/users")
export default class UserController {
  constructor(@Inject() private service: UserService) {}

  @Get("/")
  public async getAll() {
    return await this.service.getAll();
  }

  @Post("/")
  @Middleware([userCreateValidation])
  public async create(req: Request) {
    const { name } = req.body;
    await this.service.create(name);

    return HTTPStatuses.CREATED;
  }

  @Get("/:id")
  @Middleware([getByIdValidation])
  public async getById(req: Request) {
    const { id } = req.params;
    return await this.service.getById(Number(id));
  }

  @Post("/:id/borrow/:bookId")
  @Middleware([userBorrowBookValidator])
  public async borrowBook(req: Request, res: Response) {
    const { id, bookId } = req.params;
    await this.service.borrowBook(Number(id), Number(bookId));

    return HTTPStatuses.NO_CONTENT;
  }

  @Post("/:id/return/:bookId")
  @Middleware([userReturnBookValidator])
  public async returnBook(req: Request) {
    const { id, bookId } = req.params;
    const { score } = req.body;
    await this.service.returnBook(Number(id), Number(bookId), Number(score));

    return HTTPStatuses.NO_CONTENT;
  }
}
