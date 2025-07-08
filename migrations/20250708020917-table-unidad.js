'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('unidad', {
         id: {
             type: Sequelize.INTEGER,
             autoIncrement: true,
             primaryKey: true,
           },
           nombre: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           unidad_padre_id: {
             type: Sequelize.INTEGER,
             allowNull: true,
           },
           periodo_id: {
             type: Sequelize.INTEGER,
             allowNull: false,
           },
           codigo: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           correo: {
             type: Sequelize.STRING,
             allowNull: false,
           },
           estado: {
             type: Sequelize.STRING,
             allowNull: false,
             defaultValue: 'ACTIVO',
           },
  
  });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('unidad');
  }
};