'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tipo_cuenta', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    codigo: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    nombre: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    estado: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "ACTIVO",
    },
  
  });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tipo_cuenta');
  }
};