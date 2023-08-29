import { Model, DataTypes } from "sequelize";
import { Book } from "./book";
import { BookActivities } from "./book_activities";

export class User extends Model {
  public readonly id!: number;
  public readonly name!: string;
  public readonly books!: Book[];
  public readonly books_activities?: BookActivities[];
}

export default {
  tableName: "users",
  attributes: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
  },
  assocs: {
    hasMany: [
      {
        model: "books",
        foreignKey: "user_id",
      },
      {
        model: "books_activities",
        foreignKey: "user_id",
      },
    ],
  },
};
