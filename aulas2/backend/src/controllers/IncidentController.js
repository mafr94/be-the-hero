const connection = require('../database/connection');

module.exports = {
    async index( request, response) {
        // se não existir, será =1
        const { page = 1 } = request.query;

        //para receber só uma posição, é colocado [ count ] ou count[0]
        const [count] = await connection('incidents').count();
        console.log(count);


        //listar tudo
        const incidents = await connection('incidents')
        //inner join
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5) //só passam 5 registos
        //page 1-1 = 0 (0 até 4), 2-1 = 5 (5 até 10)...
        .offset((page - 1) * 5)
        //
        .select([
            'incidents.*',
            'ongs.name',
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
        ]);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        //garantir que são só os dados a receber
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;
                                    // nome no header

        //passar o id
        const [id] = await connection('incidents').insert({ 
            title,
            description, 
            value, 
            ong_id,
        });

        return response.json({ id });
    },

    async delete (request, response) {
        //id do incident
        const { id } = request.params;
        //verificar se foi mesmo criado pela ong
        const ong_id = request.headers.authorization;

        //verificar se existe
        const incident = await connection('incidents')
        .where('id', id)
        .select('ong_id')
        .first();

        // se não existir retorna erro
        if (incident.ong_id != ong_id) {
            return response.status(401).json({ error: 'Operation not permitterd.' });
        }
        // else delete
        await connection('incidents').where('id', id).delete();
        return response.status(204).send();
    }
};