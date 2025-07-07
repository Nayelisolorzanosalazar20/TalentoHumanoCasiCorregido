'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('contactos', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      telefono_personal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      telefono_domicilio: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      telefono_emergencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo_personal: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      correo_institucional: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      parentesco_emergencia: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nombre_persona_emergencia: {
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
    await queryInterface.dropTable('contactos');
  }
};