'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('trayectoria', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      nombre_institucion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_ingreso: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_salida: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      nombre_cargo: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      funcionarios_id: {
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
    await queryInterface.dropTable('trayectoria');
  }
};