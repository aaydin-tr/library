import { Model, DataTypes } from "sequelize";
import { Book } from "./book";

export class BookActivities extends Model {
  public readonly id!: number;
  public readonly book_id!: number;
  public readonly user_id!: number;
  public readonly user_score!: number;
  public readonly book?: Book;
}

export default {
  tableName: "books_activities",
  attributes: {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    book_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    user_score: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  assocs: {
    belongsTo: [
      {
        model: "users",
        foreignKey: "id",
      },
      {
        model: "books",
        foreignKey: "id",
      },
    ],
  },
};
