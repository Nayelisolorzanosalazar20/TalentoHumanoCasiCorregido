'use strict';

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cargo_asignado', {
          id: {
              type: Sequelize.INTEGER,
              autoIncrement: true,
              primaryKey: true,
            },
            
            unidad_cargo_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
            },
            funcionario_id: {
              type: Sequelize.INTEGER,
              allowNull: true,
            },
            fecha_inicio: {
              type: Sequelize.DATE,
              allowNull: false
            },
             fecha_fin: {
              type: Sequelize.DATE,
              allowNull: true
            },
            
            estado: {
              type: Sequelize.STRING,
              allowNull: false,
              defaultValue: 'ACTIVO',
            },
  
  });

  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('cargo_asignado');
  }
};