const mongoose = require('mongoose')
const request = require('supertest');
const app = require('../app');


beforeAll(async () => {
    await mongoose.connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
})

afterAll(async () => {
    await mongoose.connection.close();
});

describe('Authentication', () => {
    it('should login successfully', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({ email: 'user2@email.com', password: '123456' });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('accessToken');
    });

    it('should fail login with wrong password', async () => {
        const res = await request(app)
            .post('/users/login')
            .send({ email: 'user2@email.com', password: '123' });
        expect(res.statusCode).toBe(401);
    });
})