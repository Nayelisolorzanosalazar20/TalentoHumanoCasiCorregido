'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipo_documentos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre_archivo: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('tipo_documentos');
  }
};