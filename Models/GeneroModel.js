import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const GeneroModel = sequelize.define("genero", {
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
  tableName: 'genero',
    timestamps: false,
},);
