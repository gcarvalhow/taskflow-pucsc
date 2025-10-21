const request = require('supertest')
const app = require('../../api/app');

describe('Auth Routes', () => {
  it('Retorna erro 400 no caso de campos inválidos na requisição', async () => {
    const res = await request(app)
        .post('/auth/login')
        .send({ password: '@passwordtest' });
    expect(res.statusCode).toEqual(400);
  });
});