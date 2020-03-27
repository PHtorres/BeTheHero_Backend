
exports.up = function(knex) {
  return knex.schema.createTable('ongs', function(table){
      table.string('id').primary();
      table.string('name').notNullable();
      table.string('email').notNullable();
      table.string('whatsapp').notNullable();
      table.string('city').notNullable();
      table.string('uf', 2).notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('ongs');
};


//UP: o que será executado. Ou seja, criação da tabela.
//Down: O que será feito caso dê errado no UP. Ou seja, nesse caso, escolhi excluir a tabela.
