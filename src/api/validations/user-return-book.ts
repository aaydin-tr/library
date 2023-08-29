import { param, body } from "express-validator";
import validate from ".";

const userReturnBookValidator = [
  param("id").trim().escape().isInt().notEmpty(),
  param("bookId").trim().escape().isInt().notEmpty(),
  body("score").trim().escape().isInt({ min: 1, max: 10 }).notEmpty(),
];

export default validate(userReturnBookValidator);
