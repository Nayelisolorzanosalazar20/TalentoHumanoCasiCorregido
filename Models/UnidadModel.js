import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
export const UnidadModel = sequelize.define('unidad', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  unidad_padre_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  periodo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  estado: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'ACTIVO',
  },
}, {
  tableName: 'unidad',
  timestamps: false,
});

