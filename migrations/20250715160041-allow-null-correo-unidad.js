export async function up(queryInterface, Sequelize) {
  await queryInterface.changeColumn('unidad', 'correo', {
    type: Sequelize.STRING,
    allowNull: true,
  });
}
export async function down(queryInterface, Sequelize) {
  await queryInterface.changeColumn('unidad', 'correo', {
    type: Sequelize.STRING,
    allowNull: false,
  });
}