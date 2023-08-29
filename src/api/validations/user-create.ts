import { body } from "express-validator";
import validate from ".";

const userCreateValidator = [
  body("name")
    .trim()
    .escape()
    .isString()
    .notEmpty()
];

export default validate(userCreateValidator);
