const connection = require('../database/connection');

module.exports = {

    async create(request, response) {
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({ id });
    },

    async index(request, response) {
        const {page = 1} = request.query;
        
        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
        .limit(5)
        .offset((page - 1) * 5)
        .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
        .orderBy('id', 'desc');

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async getIncidentByOng(request, response) {
        const ong_id = request.headers.authorization;
        const incidents = await connection('incidents').where('ong_id', ong_id).select('*').orderBy('id', 'desc');
        return response.json(incidents);
    },

    async delete(request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).first();

        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operação não permitida' });
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    }
}