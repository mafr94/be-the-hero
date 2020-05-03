/**
 *  npx - executar um pacote
 *  npm - instalar
 */

/**
 * npm init -y
 * index.js com os dados na pasta src
 * package.json - colocar src/index.js
 * npm install express
 * npm install nodemon -D
 * npm install knex
 * npm install sqlite3
 * 
 * npx knex file - cria ficheiro onde terá a ligação à DB
 * 
 * criar routes.js - colocar todas as rotas
 * 
 * criar na pasta src: 
 * folder - database
 * ficheiro - db.sqlite
 * 
 * alterar no knexfile.js: filename: './src/database/db.sqlite'
 * 
 * Pensar nas entitidades
 * 
 * na pasta src/database acrescentar /migrations
 * em knexfile.js > depois de filename...} 
 *                                       }, migrations: { directory: './src/database/migrations }, useNullAsDefault: true, 
 * 
 * npx knex migrate:make create_ongs
 * 
 * no ficheiro novo:
 * exports.up - É sempre responsável pela criação da tabela
 * exports.down - dá algum problema e é necessário voltar atrás
 * 
 * npx knex migrate:latest
 * npx knex migrate:make create_incidents
 * 
 * | em caso de voltar atrás |
 *  npx migrate:rollback - 1x
 *  npx migrate:down 
 * 
 * routes.js
 * 
 * routes.post
 * const { params } = request.body;
 * 
 * add crypto
 * const crypto = require('crypto');
 * 
 * dpx de const { params }
 * const id = crypto.randomBytes(4).toString('HEX');
 * 
 * 
 * criar src/database > connection.js 
 * 
 * importar a biblioteca knex
 * const knex = require('knex');
 * 
 * importar as confgs da base de dados no ficheiro knexfile
 * const configuration = require('../../knexfile');
 * 
 * coneção de desenvolvimento
 * const connection = knex(configuration.development);
 * 
 * exportar a coneção
 * module.exports = connection;
 * 
 * importar em routes.js
 * const connection = require('/database/connection');
 * 
 *  connection('ongs').insert({ 
       id,
       name, 
       email, 
       whatsapp, 
       city, 
       uf, 
    });
 * 
 * como o return response tem de esperar pela resposta do insert
 * podemos transformar a função routes.post em async
 * routes.post('/ongs', async (request, response) => { 
 * 
 * e
 * await connection('ongs').insert({
 *  
 * return response.json ({ id });
 * 
 * criar pasta src > controllers
 * para cada entidade vai ser criado um controller
 * 
 * passar as coisas para dentro de cada controlador
 * src/controllers > OngController.js
 * 
 * ...
 * 
 * fazer restantes controlers
 * 
 * determina quem vai poder aceder a app
 * npm install cors
 * 
 */



/**
 *  Rota / Recursos
 */

/**
 *  Metodos HTTP
 * 
 * GET: Buscar uma informação do back-end
 * POST: Criar uma informação no back-end
 * PUT: Alterar uma informação no back-end
 * DELETE: Remover uma informação do back-end
 */

/**
 *  Tipos de parametros
 * 
 * Query Params: parametros nomeados na rota após "?", (filtros, paginação)
 * Route Params: parametros uttilizados para identificar recursos
 * Request Body:Corpo da requisição, utilizad opara criar ou alterar recursos
 * 
 */

/**
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server
 * NoSQL: MongoDB, CouchDB, etc
 */

/**
 * Driver: Select * from users
 * Query Builder: table('users').select('*').where()
 */

const express = require('express');
const cors = requeire('cors');
const routes = require('./routes'); //caminho relativo



const app = express(); 


/*
    em desevolvimento pode ficar vazio
    em produção terá 
    cors({ origin: 'http://www.url.com' }];
 */
app.use(cors);
app.use(express.json()); //site passa jsons
app.use(routes); //aceder às routes

app.listen(3333); //porta

