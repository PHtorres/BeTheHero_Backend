const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {

    beforeEach(async () => {
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll(async () => {
        await connection.destroy();
    });

    it('should be able to create a new incident', async () => {
        const response = await request(app).post('/incidents').send({
            title: "Caso por ai",
            description: "Detalhes do caso por ai",
            value: 100
        }).set({ Authorization: '943647ed' });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toBeGreaterThanOrEqual(1);
    })
})