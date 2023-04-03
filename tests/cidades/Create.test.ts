import { StatusCodes } from 'http-status-codes';
import { testServer } from '../jest.setup';

describe('Cidades - Create', () => {
  it('Cria registro', async () => { // it é um caso de teste
    const res1 = await testServer.post('/cidades').send({
      nome: 'Renanlandia',
      quantidade: 2,
      ativa: true
    });

    expect(res1.statusCode).toEqual(StatusCodes.CREATED)
  });

  it('Tenta criar registro com o nome muito curto', async () => { // it é um caso de teste
    const res1 = await testServer.post('/cidades').send({
      nome: 'Re',
      quantidade: 2,
      ativa: true
    });

    expect(res1.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res1.body).toHaveProperty('errors.nome')
  });
});
