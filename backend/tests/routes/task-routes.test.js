const request = require('supertest');
const app = require('../../api/app');

describe('Task Routes', () => {
  it('Retorna erro 401 ao tentar acessar tasks sem autenticação', async () => {
    const res = await request(app)
      .get('/tasks');
    expect(res.statusCode).toEqual(401);
  });

  it('Retorna erro 401 ao tentar criar task sem autenticação', async () => {
    const res = await request(app)
      .post('/tasks')
      .send({ title: 'Teste', description: 'Descrição' });
    expect(res.statusCode).toEqual(401);
  });

  it('Retorna erro 401 ao atualizar task sem token', async () => {
    const res = await request(app)
      .put('/tasks/1')
      .send({ title: 'Novo título' });
    expect(res.statusCode).toEqual(401);
  });

  it('Retorna erro 401 ao deletar task sem token', async () => {
    const res = await request(app)
      .delete('/tasks/1');
    expect(res.statusCode).toEqual(401);
  });
});