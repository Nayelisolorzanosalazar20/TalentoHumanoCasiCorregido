import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";


export const DiscapacidadModel = sequelize.define('discapacidad', {
  id: 
  { type: DataTypes.INTEGER, primaryKey: true, 
    autoIncrement: true },
  Numero_carnet_discapacidad:
   { type: DataTypes.STRING, 
    allowNull: false },
  tipo_discapacidad_id: 
  { type: DataTypes.INTEGER, 
    allowNull: false },
  grado_discapacidad_id: 
  { type: DataTypes.INTEGER, 
    allowNull: false },
  funcionario_id:
   { type: DataTypes.INTEGER,
     allowNull: false },

}, {
  tableName: 'discapacidad',
  timestamps: true
});