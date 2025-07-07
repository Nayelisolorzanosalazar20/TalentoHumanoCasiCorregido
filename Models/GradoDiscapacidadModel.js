import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const GradoDiscapacidadModel = sequelize.define("grado_discapacidad", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  grado: {
    type: DataTypes.STRING,
    allowNull: true
  },
},
{
    tableName: 'grado_discapacidad',
    timestamps: false,
},);
