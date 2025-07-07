'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('capacitaciones', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      ruta_almacenamiento: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      descripcion: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      fecha_inicio: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      fecha_fin: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      n_horas: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable('capacitaciones');
  }
};