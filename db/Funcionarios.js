import { DataTypes } from "sequelize";
import { sequelize } from "./conexion.js";
// Importar modelos relacionados con validaciones


export const Funcionarios = sequelize.define('funcionarios', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombres: { type: DataTypes.STRING, allowNull: false },
  apellidos: { type: DataTypes.STRING, allowNull: false },
  edad: { type: DataTypes.INTEGER, allowNull: false, validate: { isInt: true, min: 0 } },
  DNI: { type: DataTypes.STRING, allowNull: false, unique: true },
  nacionalidad: { type: DataTypes.STRING, allowNull: false },
  tipo_sangre: { type: DataTypes.STRING, allowNull: false },
  fecha_nacimiento: { type: DataTypes.DATE, allowNull: false },
  direccion: { type: DataTypes.STRING, allowNull: false },
  direccion_referencia: { type: DataTypes.STRING, allowNull: false },
  residencia: { type: DataTypes.STRING, allowNull: true },
  profesion: { type: DataTypes.STRING, allowNull: true },
  fecha_inicio_contrato: { type: DataTypes.DATE, allowNull: true },
  fecha_fin_contrato: { type: DataTypes.DATE, allowNull: true },
  foto: { type: DataTypes.STRING, allowNull: true },
  Numero_carnet_discapacidad: { type: DataTypes.STRING, allowNull: true },
  genero_id: { type: DataTypes.INTEGER, allowNull: false },
  estado_civil_id: { type: DataTypes.INTEGER, allowNull: false },
  etnia_id: { type: DataTypes.INTEGER, allowNull: false },
  parroquia_id: { type: DataTypes.INTEGER, allowNull: false },
  tipo_discapacidad_id: { type: DataTypes.INTEGER, allowNull: true },
  grado_discapacidad_id: { type: DataTypes.INTEGER, allowNull: true },
}, {
  tableName: 'funcionarios',
  timestamps: false
});