import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
export const CargoAsignadoModel = sequelize.define('cargo_asignado', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  
  unidad_cargo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
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
    allowNull: false,
    defaultValue: 'ACTIVO',
  },
}, {
  tableName: 'cargo_asignado',
  timestamps: false,
});