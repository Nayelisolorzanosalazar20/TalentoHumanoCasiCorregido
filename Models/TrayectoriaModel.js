import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";
export const TrayectoriaModel = sequelize.define(
  "trayectoria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre_institucion: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    fecha_ingreso: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fecha_salida: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    nombre_cargo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    funcionario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName:'trayectoria',
    timestamps: false,
  }
);

TrayectoriaModel.belongsTo(FuncionariosModel, { as: 'funcionarios', foreignKey: 'funcionario_id' });
FuncionariosModel.hasMany(TrayectoriaModel, { as: 'trayectorias', foreignKey: 'funcionario_id' });