'use strict';

/** @type {import('sequelize-cli').Migration} */
export default  {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('documentos', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: 'Unique identifier for the document'
      },
      ruta_almacenamiento: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: 'Storage path for the document'
      },
      tipo_documento_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'tipo_documentos', // nombre de la tabla relacionada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        comment: 'Foreign key referencing the tipos_documento table'
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funcionarios', // nombre de la tabla relacionada
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
        comment: 'Foreign key referencing the funcionarios table'
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp for when the document was created'
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
        comment: 'Timestamp for when the document was last updated'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('documentos');
  }
};