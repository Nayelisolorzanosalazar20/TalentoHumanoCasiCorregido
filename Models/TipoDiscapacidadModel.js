import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const TipoDiscapacidadModel = sequelize.define("tipo_discapacidad", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
},
{
    tableName:"tipo_discapacidad",
    timestamps: false,
},);

