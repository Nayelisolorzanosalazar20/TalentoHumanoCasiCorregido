import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
export const UnidadCargoModel = sequelize.define('unidad_cargo', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  cargos_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  unidad_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  encargado: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  periodo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 
}, {
  tableName: 'unidad_cargo',
  timestamps: false,
});

