const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index( request, response) {
        //listar tudo
        const ongs = await connection('ongs').select('*');

        return response.json(ongs);
    },

    async create(request, response) {
        //garantir que são só os dados a receber
        const { name, email, whatsapp, city, uf } = request.body;
        //criar uma string random de 4 bits
        const id = crypto.randomBytes(4).toString('HEX');

        await connection('ongs').insert({ 
            id,
            name, 
            email, 
            whatsapp, 
            city, 
            uf, 
        });

        return response.json( id );
    }
};