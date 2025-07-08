'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cargos', {
         id: {
           type: Sequelize.INTEGER,
           autoIncrement: true,
           primaryKey: true,
         },
         nombre: {
           type: Sequelize.STRING,
           allowNull: false
         },
           sueldo: {
           type: Sequelize.DOUBLE,
           allowNull: false
         },
         periodo_id: {
           type: Sequelize.INTEGER,
           allowNull: false
         
       },
       grupo_ocupacional: {
           type: Sequelize.STRING,
           allowNull: false
         },
  
  });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cargos');
  }
};