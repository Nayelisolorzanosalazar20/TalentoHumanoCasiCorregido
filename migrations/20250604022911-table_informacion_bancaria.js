
'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('informacion_bancaria', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
    
      numero_cuenta: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tipo_cuenta: {
        type: Sequelize.STRING,
        allowNull: false,
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
    await queryInterface.dropTable('informacion_bancaria');
  }
};