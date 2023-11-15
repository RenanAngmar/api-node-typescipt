import supertest from 'supertest'

import { server } from '../src/server/Server'
import { Knex } from '../src/server/database/knex';


// Antes de executar qualquer teste o knex precisa rodar o migrate
beforeAll(async () => {
  await Knex.migrate.latest();
})

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);
// await testServer.get('cidades').send({id:'1', nome: 'Renanopolis', quantidade: 3, ativa: true})