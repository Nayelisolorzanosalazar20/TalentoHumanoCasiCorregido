'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('periodo', {
       id: {
         type: Sequelize.INTEGER,
         autoIncrement: true,
         primaryKey: true,
       },
       nombre: {
         type: Sequelize.STRING,
         allowNull: false
       },
       fecha_inicio: {
         type: Sequelize.DATE,
         allowNull: false
       },
       fecha_fin: {
         type: Sequelize.DATE,
         allowNull: true
       },
       estado: {
         type: Sequelize.STRING,
         allowNull: false,
         defaultValue: "ACTIVO",
       },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('periodo');
  }
};