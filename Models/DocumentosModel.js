// DocumentoModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { FuncionariosModel } from "./FuncionariosModel.js";
import {TipoDocumentosModel} from "./TipoDocumentosModel.js"

export const DocumentosModel = sequelize.define("documentos", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  ruta_almacenamiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipo_documento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
 
      createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW // <-- Esto es lo importante
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
}, {
  tableName:'documentos',
  timestamps: true,
});

TipoDocumentosModel.hasMany(DocumentosModel, { foreignKey: "tipo_documento_id" });
DocumentosModel.belongsTo(TipoDocumentosModel, { foreignKey: "tipo_documento_id" });

FuncionariosModel.hasMany(DocumentosModel, { foreignKey: "funcionario_id" });
DocumentosModel.belongsTo(FuncionariosModel, { foreignKey: "funcionario_id" });

