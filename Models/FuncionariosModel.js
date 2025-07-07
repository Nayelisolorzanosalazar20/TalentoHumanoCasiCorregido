import { DataTypes } from "sequelize";
import { sequelize } from "../db/conexion.js";
import { GeneroModel } from "./GeneroModel.js";
import { EstadoCivilModel } from "./EstadoCivilModel.js";
import { ParroquiaModel } from "./ParroquiaModel.js";
import { EtniaModel } from "./EtniaModel.js";
import { TipoDiscapacidadModel } from "./TipoDiscapacidadModel.js";
import { GradoDiscapacidadModel } from "./GradoDiscapacidadModel.js";
import { CantonModel } from "./CantonModel.js";
export const FuncionariosModel = sequelize.define(
  "funcionarios",
  {
         id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        
      },
      nombres: {
        type: DataTypes.STRING,
        allowNull: false,
          validate: {
    notNull: { msg: 'Los nombres son obligatorios' },
    notEmpty: { msg: 'Los nombres no puede estar vacío' }
    }
      },

      apellidos: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'Los apellidos son obligatorios' },
    notEmpty: { msg: 'Los apellidos no puede estar vacío' }
        }
      },

      edad: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
    notNull: { msg: 'La edad es obligatoria' },
    notEmpty: { msg: 'La edad no puede estar vacía' }
        }
      },

      DNI: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'Su numero de cedula es obligatoria' },
    notEmpty: { msg: 'Su numero de cedula no puede estar vacía' }
        }
      },

      nacionalidad: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'La nacionalidad es obligatoria' },
    notEmpty: { msg: 'La nacionalidad no puede estar vacía' }
        }
      },

      tipo_sangre: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'Su tipo de sangre es obligatorio' },
    notEmpty: { msg: 'Su tipo de sangre no puede estar vacío' }
        }
      },

      fecha_nacimiento: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
    notNull: { msg: 'La fecha de nacimiento es obligatorio' },
    notEmpty: { msg: 'La fecha de nacimiento no puede estar vacío' }
        }
      },

      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'Su direccion es obligatoria' },
    notEmpty: { msg: 'Su direccion no puede estar vacío' }
        }
      },

      direccion_referencia: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
    notNull: { msg: 'La direccion de referencia es obligatoria' },
    notEmpty: { msg: 'La direccion de referencia no puede estar vacío' }
        }
      },

      residencia: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      profesion: {
        type: DataTypes.STRING,
        allowNull: true,
      },

      fecha_inicio_contrato: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      fecha_fin_contrato: {
        type: DataTypes.DATE,
        allowNull: true,
      },

      foto: {
        type: DataTypes.STRING,
        allowNull: false,
                validate: {
    notNull: { msg: 'La foto es obligatoria' },
    notEmpty: { msg: 'La foto no puede estar vacío' }
        }
      },

      Numero_carnet_discapacidad: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },

      genero_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      estado_civil_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      // models/Funcionario.js
      canton_id: {
       type: DataTypes.INTEGER,
       references: {
       model: 'canton',
       key: 'id'
      }
   },

      etnia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      parroquia_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },

      tipo_discapacidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      
      grado_discapacidad_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
  
  },
  {
    tableName: 'funcionarios',
    timestamps: false,
  }
);

GeneroModel.hasMany(FuncionariosModel, { foreignKey: "genero_id" });
FuncionariosModel.belongsTo(GeneroModel, { foreignKey: "genero_id" });

EstadoCivilModel.hasMany(FuncionariosModel, { foreignKey: "estado_civil_id" });
FuncionariosModel.belongsTo(EstadoCivilModel, {
  foreignKey: "estado_civil_id",
});

EtniaModel.hasMany(FuncionariosModel, { foreignKey: "etnia_id" });
FuncionariosModel.belongsTo(EtniaModel, { as: 'etnia', foreignKey: "etnia_id" });

ParroquiaModel.hasMany(FuncionariosModel, { foreignKey: "parroquia_id" });
FuncionariosModel.belongsTo(ParroquiaModel, { as: 'parroquia', foreignKey: "parroquia_id" });

TipoDiscapacidadModel.hasMany(FuncionariosModel, {
  foreignKey: "tipo_discapacidad_id",
});
FuncionariosModel.belongsTo(TipoDiscapacidadModel, {
  foreignKey: "tipo_discapacidad_id",
});

GradoDiscapacidadModel.hasMany(FuncionariosModel, {
  foreignKey: "grado_discapacidad_id",
});
FuncionariosModel.belongsTo(GradoDiscapacidadModel, {
  foreignKey: "grado_discapacidad_id",
});
CantonModel.hasMany(FuncionariosModel, { foreignKey: "canton_id" });
FuncionariosModel.belongsTo(CantonModel, { foreignKey: "canton_id" });
