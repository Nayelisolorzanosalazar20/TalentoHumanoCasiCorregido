import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";

export const FormacionAcademicaModel = sequelize.define("formacion_academica", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  institucion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  titulo_obtenido: {
    type: DataTypes.STRING,
    allowNull: true
  },
  n_registro: {
    type: DataTypes.STRING,
    allowNull: false
  },
  especialidad: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha_registro: {
    type: DataTypes.DATE,
    allowNull: true
  },
  funcionario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName:'formacion_academica',
  timestamps: false,
});



FormacionAcademicaModel.belongsTo(FuncionariosModel, { as: 'funcionarios', foreignKey: 'funcionario_id' });
FuncionariosModel.hasMany(FormacionAcademicaModel, { as: 'formaciones', foreignKey: 'funcionario_id' });