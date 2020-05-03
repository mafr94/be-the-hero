//importar a biblioteca knex
const knex = require('knex');

//importar as confgs da base de dados no ficheiro knexfile
const configuration = require('../../knexfile');

//coneção de desenvolvimento
const connection = knex(configuration.development);

//exportar a coneção
module.exports = connection;