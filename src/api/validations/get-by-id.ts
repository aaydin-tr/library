import { param } from "express-validator";
import validate from ".";

const getByIdValidator = [
  param("id").trim().escape().isNumeric().notEmpty(),
];

export default validate(getByIdValidator);
