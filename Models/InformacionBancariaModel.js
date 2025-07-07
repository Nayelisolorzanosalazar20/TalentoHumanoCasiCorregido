import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { InstitucionFinancieraModel } from "./InstitucionFinancieraModel.js";
import { FuncionariosModel } from "./FuncionariosModel.js";

export const InformacionBancariaModel = sequelize.define(
  "informacion_bancaria",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    tipo_cuenta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    numero_cuenta: {
      type: DataTypes.STRING,
      allowNull: false,
    },
 
    institucion_financiera_id: { 
       type: DataTypes.INTEGER, 
       allowNull: false
     },

    funcionario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'informacion_bancaria',
    timestamps: false,
  }
);

// Relaciones
InstitucionFinancieraModel.hasMany(InformacionBancariaModel, {
  foreignKey: "institucion_financiera_id",
});
InformacionBancariaModel.belongsTo(InstitucionFinancieraModel, {
  foreignKey: "institucion_financiera_id", as : "institucion_financiera",
});

FuncionariosModel.hasMany(InformacionBancariaModel, {
  foreignKey: "funcionario_id",
});
InformacionBancariaModel.belongsTo(FuncionariosModel, {
  foreignKey: "funcionario_id",
});