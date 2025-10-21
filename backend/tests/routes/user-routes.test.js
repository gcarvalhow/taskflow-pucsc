const request = require('supertest');
const app = require('../../api/app');

describe('User Routes', () => {
  it('Retorna erro 401 ao tentar acessar usuário sem autenticação', async () => {
    const uuid = '123e4567-e89b-12d3-a456-426614174000';
    const res = await request(app)
      .get(`/users/${uuid}`);
    expect(res.statusCode).toEqual(401);
  });

  it('Retorna erro 400 no caso de campos inválidos na requisição', async () => {
    const res = await request(app)
        .post('/users')
        .send({ password: '@passwordtest' });
    expect(res.statusCode).toEqual(400);
  });
});