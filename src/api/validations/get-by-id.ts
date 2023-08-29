import { param } from "express-validator";
import validate from ".";

const getByIdValidator = [
  param("id").trim().escape().isInt().notEmpty(),
];

export default validate(getByIdValidator);
