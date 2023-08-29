import { body } from "express-validator";
import validate from ".";

const bookCreateValidator = [
  body("name")
    .trim()
    .escape()
    .isString()
    .notEmpty()
];

export default validate(bookCreateValidator);
