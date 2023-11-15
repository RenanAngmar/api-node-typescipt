import { ETableNames } from './../ETableNames';
import { Knex } from 'knex';

export async function up(knex: Knex) {
  return knex.schema.createTable(ETableNames.cidade, (table) => {
    table.bigIncrements('id').primary().index();
    table.string('nome', 150).checkLength('<=', 150).index().notNullable();
    table.integer('quantidade');
    table.boolean('ativa');
    table.comment('Tabela usada para armazenar cidades do sistema.');
  });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.cidade).then(() => {
    console.log(`# Exclusão da tabela ${ETableNames.cidade}`);
  });
}
