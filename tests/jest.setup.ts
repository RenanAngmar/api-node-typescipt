import supertest from 'supertest'

import { server } from '../src/server/Server'

export const testServer = supertest(server);

// await testServer.get('cidades').send({id:'1', nome: 'Renanopolis', quantidade: 3, ativa: true})