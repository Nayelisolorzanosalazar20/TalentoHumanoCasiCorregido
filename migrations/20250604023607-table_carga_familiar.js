'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('carga_familiar', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre_persona: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      cedula: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      nivel_educativo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parentesco: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'funcionarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('carga_familiar');
  }
};