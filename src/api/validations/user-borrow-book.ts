import { param } from "express-validator";
import validate from ".";

const userBorrowBookValidator = [
  param("id").trim().escape().isNumeric().notEmpty(),
  param("bookId").trim().escape().isNumeric().notEmpty(),
];

export default validate(userBorrowBookValidator);
