
'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('institucion_financiera', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre_institucion: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('institucion_financiera');
  }
};