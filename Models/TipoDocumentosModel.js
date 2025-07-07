// DocumentoModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TipoDocumentosModel = sequelize.define(
  "tipo_documentos",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName:'tipo_documentos',
    timestamps: false,
  }
);
