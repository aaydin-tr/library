import { param } from "express-validator";
import validate from ".";

const userBorrowBookValidator = [
  param("id").trim().escape().isInt().notEmpty(),
  param("bookId").trim().escape().isInt().notEmpty(),
];

export default validate(userBorrowBookValidator);
