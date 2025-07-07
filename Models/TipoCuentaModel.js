import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TipoCuentaModel = sequelize.define(
  "tipo_cuenta",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    codigo: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    estado: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ACTIVO",
    },
  },
  {
    tableName: "tipo_cuenta",
    timestamps: false,
  }
);