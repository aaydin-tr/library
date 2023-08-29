import { param, body } from "express-validator";
import validate from ".";

const userReturnBookValidator = [
  param("id").trim().escape().isNumeric().notEmpty(),
  param("bookId").trim().escape().isNumeric().notEmpty(),
  body("score").trim().escape().isNumeric().notEmpty(),
];

export default validate(userReturnBookValidator);
