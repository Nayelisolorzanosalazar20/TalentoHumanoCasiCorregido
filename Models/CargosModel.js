import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { PeriodoModel } from "./PeriodoModel.js";


export const CargosModel = sequelize.define("cargos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
    sueldo: {
    type: DataTypes.DOUBLE,
    allowNull: false
  },
  periodo_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  
},
grupo_ocupacional: {
    type: DataTypes.STRING,
    allowNull: false
  },
  
}, {
  tableName: 'cargos',
  timestamps: false,
});
CargosModel.belongsTo(PeriodoModel, { as: 'periodo', foreignKey: 'periodo_id' });
PeriodoModel.hasMany(CargosModel, { as: 'cargos', foreignKey: 'periodo_id' });


