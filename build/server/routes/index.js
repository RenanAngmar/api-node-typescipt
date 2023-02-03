"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const http_status_codes_1 = require("http-status-codes"); // lib externa para status
const router = (0, express_1.Router)();
exports.router = router;
router.get('/', (req, res) => {
    return res.send('Olá, Dev !');
});
router.post('/teste', (req, res) => {
    console.log('Dado: ', req.body); // mostra o que o front enviou para o back no corpo
    // Aqui apenas um teste para retornar valores específicos
    // let obj = {
    //   idFinal: req.body.id,
    //   nomeIndividuo: req.body.nome
    // }
    // return res.json(req.body); // Aqui é a resposta para o front no body
    // Aqui um exemplo de status especifico.
    // res.statusMessage = "Não autorizado"
    return res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(req.body);
});
router.post('/teste2/:id', (req, res) => {
    // Exemplo usando params
    // mostra o que o front enviou para o back utilizando params
    // valores que vem na url da chamada. Valores primitivos, string, boolean, number...
    console.log('Dado: ', req.params.id);
    return res.json(req.params); // Aqui é a resposta para o front
});
router.post('/teste3', (req, res) => {
    // Exemplo usando params
    // mostra o que o front enviou para o back utilizando params
    // valores que vem na url da chamada. Valores primitivos, string, boolean, number...
    console.log('Dado: ', req.query);
    return res.json(req.query); // Aqui é a resposta para o front
});
