import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";

export const CapacitacionesModel = sequelize.define("capacitaciones", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ruta_almacenamiento: {
    type: DataTypes.STRING,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha_inicio: {
    type: DataTypes.DATE,
    allowNull: true
  },
  fecha_fin: {
    type: DataTypes.DATE,
    allowNull: true
  },
  n_horas: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  funcionario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName:'capacitaciones',
  timestamps: false,
});


CapacitacionesModel.belongsTo(FuncionariosModel, { as: 'funcionarios', foreignKey: "funcionario_id" });
FuncionariosModel.hasMany(CapacitacionesModel, { as: 'capacitaciones', foreignKey: "funcionario_id" });

