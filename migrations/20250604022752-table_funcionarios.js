'use strict';
/** @type {import('sequelize-cli').Migration} */


export default {
  up: async (queryInterface, Sequelize) =>{
    await queryInterface.createTable('funcionarios', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombres: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      apellidos: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      edad: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      DNI: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nacionalidad: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_sangre: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      fecha_nacimiento: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      direccion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      direccion_referencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      residencia: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      profesion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_inicio_contrato: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_fin_contrato: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      foto: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      Numero_carnet_discapacidad: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      genero_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'genero', key: 'id' },
      },
      estado_civil_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'estado_civil', key: 'id' },
      },
      etnia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'etnia', key: 'id' },
      },
      parroquia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'parroquia', key: 'id' },
      },
      tipo_discapacidad_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'tipo_iscapacidad', key: 'id' },
      },
      grado_discapacidad_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'grado_discapacidad', key: 'id' },
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('funcionarios');
  }
};