'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('formacion_academica', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      institucion: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      titulo_obtenido: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      n_registro: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      especialidad: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_registro: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funcionarios',
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('formacion_academica');
  }
};