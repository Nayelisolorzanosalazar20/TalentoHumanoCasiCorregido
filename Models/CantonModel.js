import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { ProvinciaModel } from "./ProvinciaModel.js";

export const CantonModel = sequelize.define("canton", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  provincia_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'canton',
  timestamps: false,
});

ProvinciaModel.hasMany(CantonModel, { foreignKey: "provincia_id", as: "Provincia" });
CantonModel.belongsTo(ProvinciaModel, { foreignKey: "provincia_id",  as: "Provincia"});

