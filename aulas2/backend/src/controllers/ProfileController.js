const connection = require('../database/connection');

//listar só incidents de uma unica ong
module.exports = {
    async index( request, response) {
        //listar tudo
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
};