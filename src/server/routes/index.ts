import {Router} from 'express';

const router = Router();

router.get('/', (req, res) => {
  return res.send('Olá, Dev !');
});

router.post('/teste', (req, res) => {

  console.log("Dado: ", req.body); // mostra o que o fornt enviou
  
  return res.send(req.body); // Aqui é a resposta para o front
});
export { router }