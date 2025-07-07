'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
    up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('genero', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('genero');
  }
};