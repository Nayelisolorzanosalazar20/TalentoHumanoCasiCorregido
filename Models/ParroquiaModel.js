import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { CantonModel } from "./CantonModel.js"; 

export const ParroquiaModel = sequelize.define("parroquia", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  canton_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'parroquia',
  timestamps: false,
});

CantonModel.hasMany(ParroquiaModel, { foreignKey: "canton_id" });
ParroquiaModel.belongsTo(CantonModel, { foreignKey: "canton_id", as: "Canton" });
