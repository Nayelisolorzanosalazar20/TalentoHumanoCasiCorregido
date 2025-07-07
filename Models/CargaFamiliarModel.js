// DocumentoModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";

export const CargaFamiliarModel = sequelize.define("carga_familiar", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre_persona: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  cedula: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  nivel_educativo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  parentesco: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
}, {
  tableName: 'carga_familiar',
  timestamps: false,
});



FuncionariosModel.hasMany(CargaFamiliarModel, { foreignKey: "funcionario_id", as: "carga_familiar" });
CargaFamiliarModel.belongsTo(FuncionariosModel, { foreignKey: "funcionario_id", as: "funcionarios" });

