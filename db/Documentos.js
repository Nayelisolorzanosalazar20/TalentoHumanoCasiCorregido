import { DataTypes } from "sequelize";
import { sequelize } from "./conexion.js";

export const Documentos = sequelize.define('documentos', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  ruta_almacenamiento: { type: DataTypes.STRING },
  tipo_documento_id: { type: DataTypes.INTEGER },
  funcionario_id: { type: DataTypes.INTEGER },
  createdAt: { type: DataTypes.DATE },
  updatedAt: { type: DataTypes.DATE }
}, {
  tableName: 'documentos',
  timestamps: true
});