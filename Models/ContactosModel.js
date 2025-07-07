import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";

export const ContactosModel = sequelize.define("contactos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  telefono_personal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  telefono_domicilio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  telefono_emergencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo_personal: {
    type: DataTypes.STRING,
    allowNull: false
  },
  correo_institucional: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentesco_emergencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nombre_persona_emergencia: {
    type: DataTypes.STRING,
    allowNull: false
  },
  funcionario_id: { 
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {tableName:'contactos',
  timestamps: false,
});

ContactosModel.belongsTo(FuncionariosModel, { as: 'funcionarios', foreignKey: 'funcionario_id' });
FuncionariosModel.hasMany(ContactosModel, { as: 'contactos', foreignKey: 'funcionario_id' });