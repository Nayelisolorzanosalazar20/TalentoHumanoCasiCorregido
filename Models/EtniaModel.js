import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const EtniaModel = sequelize.define(
  "etnia",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "etnia",
    timestamps: false,
  }
);
