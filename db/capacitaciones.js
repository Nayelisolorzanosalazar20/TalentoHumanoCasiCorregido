import { DataTypes } from "sequelize";
import { sequelize } from "./conexion.js";

export const Capacitaciones = sequelize.define('capacitaciones', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ruta_almacenamiento: { type: DataTypes.STRING },
  descripcion: { type: DataTypes.STRING },
  fecha_inicio: { type: DataTypes.DATE },
  fecha_fin: { type: DataTypes.DATE },
  n_horas: { type: DataTypes.INTEGER },

}, {
  tableName: 'capacitaciones',
  timestamps: true
});