'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('discapacidad', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
      },
      Numero_carnet_discapacidad: {
        type: Sequelize.STRING,
        allowNull: false
      },
      tipo_discapacidad_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      grado_discapacidad_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funcionarios',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },
    
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('discapacidad');
  }
};