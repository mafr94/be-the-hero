
// É sempre responsável pela criação da tabela
exports.up = function(knex) {
    //criar tabela 
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // 2 - só dois caracteres

    });
};

// dá algum problema e é necessário voltar atrás
exports.down = function(knex) {
    //eliminar a tabela
    return knex.schema.dropTable('ongs');
};
