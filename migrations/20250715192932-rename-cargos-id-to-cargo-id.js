'use strict';

export async function up(queryInterface, Sequelize) {
  return queryInterface.renameColumn('unidad_cargo', 'cargos_id', 'cargo_id');
}
export async function down(queryInterface, Sequelize) {
  return queryInterface.renameColumn('unidad_cargo', 'cargo_id', 'cargos_id');
}
