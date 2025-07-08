import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";

export const PeriodoModel = sequelize.define("periodo", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
   fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: false
  },
   fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  tableName: 'periodo',
  timestamps: false,
});
