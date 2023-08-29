import { Model, DataTypes, ENUM } from "sequelize";

export class Book extends Model {
  public id!: number;
  public name!: string;
  public user_id!: number;
  public status!: string;
  public score!: number;
  public borrowed_count!: number;
}

export enum BookStatus {
  available = "available",
  borrowed = "borrowed",
}

export default {
  tableName: "books",
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM(...Object.values(BookStatus)),
      allowNull: false,
      defaultValue: BookStatus.available,
    },
    score: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: -1,
    },
    borrowed_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  assocs: {
    belongsTo: [
      {
        model: "users",
        foreignKey: "user_id",
      },
    ],
    hasMany: [
      {
        model: "books_activities",
        foreignKey: "book_id",
      },
    ],
  },
};
