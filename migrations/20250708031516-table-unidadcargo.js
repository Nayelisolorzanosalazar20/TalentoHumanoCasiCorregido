'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('unidad_cargo', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
          },
          
          cargos_id: {
            type: Sequelize.INTEGER,
            allowNull: true,
          },
          unidad_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
          encargado: {
            type: Sequelize.DATE,
            allowNull: false,
          },
          periodo_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
          },
  
  });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('unidad_cargo');
  }
};