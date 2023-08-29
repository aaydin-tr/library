import { Inject, Service } from "typedi";
import UserRepository from "../repository/user";
import { CustomError } from "../types/types";
import HTTPStatuses from "../consts/http-statuses";
import { User } from "../models/user";
import BookRepository from "../repository/book";
import { Book, BookStatus } from "../models/book";
import BookActivitiesRepository from "../repository/book_activities";

@Service()
export default class UserService {
  constructor(
    @Inject() private readonly userRepository: UserRepository,
    @Inject() private readonly bookRepository: BookRepository,
    @Inject()
    private readonly bookActivitiesRepository: BookActivitiesRepository
  ) {}

  public async create(name: string) {
    const user = await this.userRepository.getByName(name);
    if (user) {
      throw new CustomError("User already exists", HTTPStatuses.BAD_REQUEST);
    }

    return await this.userRepository.create(name);
  }

  public async getAll() {
    return await this.userRepository.getAll();
  }

  public async getById(id: number) {
    const user = (await this.userRepository.getById(id)) as User;
    if (!user) {
      throw new CustomError("User not found", HTTPStatuses.NOT_FOUND);
    }

    return {
      id: user.id,
      name: user.name,
      books: {
        past : user.books_activities?.map((bookActivity) => {
          return {
            name: bookActivity.book?.name || "Unknown",
            userScore: bookActivity.user_score,
          };
        }),
        present : user.books?.map((book) => {
          return {
            id: book.name,
          };
        }),
      }
    }

  }

  public async borrowBook(userId: number, bookId: number) {
    const book = (await this.bookRepository.getById(bookId, [
      "id",
      "user_id",
      "borrowed_count",
      "score",
      "status",
    ])) as Book;
    if (!book) {
      throw new CustomError("Book not found", HTTPStatuses.NOT_FOUND);
    }

    const user = (await this.userRepository.getById(userId)) as User;
    if (!user) {
      throw new CustomError("User not found", HTTPStatuses.NOT_FOUND);
    }

    if (book.user_id) {
      throw new CustomError(
        "Book is already borrowed",
        HTTPStatuses.UNAUTHORIZED
      );
    }

    book.set("user_id", userId, { reset: true });
    book.set("status", BookStatus.borrowed, { reset: true });
    book.set("borrowed_count", book.borrowed_count + 1, { reset: true });
    return await book.save();
  }

  public async returnBook(userId: number, bookId: number, score: number) {
    const book = (await this.bookRepository.getById(bookId, [
      "id",
      "user_id",
      "borrowed_count",
      "score",
      "status",
    ])) as Book;

    if (!book) {
      throw new CustomError("Book not found", HTTPStatuses.NOT_FOUND);
    }

    const user = (await this.userRepository.getById(userId)) as User;
    if (!user) {
      throw new CustomError("User not found", HTTPStatuses.NOT_FOUND);
    }

    if (book.status === BookStatus.available) {
      throw new CustomError("Book is not borrowed", HTTPStatuses.BAD_REQUEST);
    }

    if (book.user_id !== userId) {
      throw new CustomError(
        "Book is borrowed by another user",
        HTTPStatuses.UNAUTHORIZED
      );
    }

    const oldScore = book.score;
    const oldBorrowedCount = book.borrowed_count;
    const newScore =
      oldScore === -1
        ? score
        : (oldScore * oldBorrowedCount + score) / (oldBorrowedCount + 1);

    book.set("user_id", null, { reset: true });
    book.set("status", BookStatus.available, { reset: true });
    book.set("score", newScore, { reset: true });

    await this.bookActivitiesRepository.create(userId, bookId, score);

    return await book.save();
  }
}
