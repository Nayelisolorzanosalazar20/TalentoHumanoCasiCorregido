import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";


export const EstadoCivilModel = sequelize.define("estado_civil", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
    tableName:'estado_civil',
    timestamps: false,
},);
