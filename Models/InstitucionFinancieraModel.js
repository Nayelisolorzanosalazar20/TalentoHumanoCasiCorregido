import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const InstitucionFinancieraModel = sequelize.define(
  "institucion_financiera",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_institucion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'institucion_financiera',
    timestamps: false,
  }
);
