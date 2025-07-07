import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const ProvinciaModel = sequelize.define("provincia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_provincia: {
    type: DataTypes.STRING,
    allowNull: false
  },
},
{
    tableName: 'provincia',
    timestamps: false,
},);

