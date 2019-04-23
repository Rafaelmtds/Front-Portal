const express = require('express');
const router = express.Router();
const axios = require("axios"); // Usamos Axios para fazer as requests à API
const appConfig = require(process.cwd() + '/configs/appConfig.json');


// Servir arquivos estáticos (páginas, mídia, etc)
router.use(express.static(__dirname + '/static/'));

// GET routes:
//Esse dados eu coloquei apenas para "simular os dados do banco"
router.get('/', (req, res) => {
    res.render(process.cwd() + '/views/index', { denuncias :[{id:1, descricao :"Todos as descriçõe",email :"Teste@123.com",data: '25/02/2089',status:"Solucionada", responsavel:" Leonardo"},
    {id:2, descricao :"Todos as descriçõe",email :"Teste@123.com",data: '25/02/2089',status:"Cancelada", responsavel:" Rafael"},
    {id:1, descricao :"Teste 3",email :"Teste@123.com",data: '25/02/2089',status:"Revisao", responsavel:" Andrezza"}  ]});
});

router.get('/comissao', (req, res) => {
    res.render(process.cwd() + '/views/comissao', { membros :[{id:1, nome :"Rafael",email :"Teste@123.com",status:"ativo",periodo: '3' },
                                                                     {id:2, nome :"Pedro",email :"Teste@123.com",status:"ativo",periodo: '4'},
                                                                     {id:3, nome :"Leo",email :"Teste@123.com",status:"ativo",periodo: '4'},
                                                                     {id:4, nome :"Ana",email :"Teste@123.com",status:"ativo",periodo: '3'}]});
});

router.get('/cadastro', (req, res) => {
    res.render(process.cwd() + '/views/usuarios', { membros :[{id:1, nome :"Rafael",email :"Teste@123.com",status:"1",periodo: '3' },
    {id:2, nome :"Pedro",email :"Teste@123.com",status:"0",periodo: '4'}]});
});

router.get('/login', (req, res) => {
    res.render(process.cwd() + '/views/login', {});
});

router.get('/admin', (req, res) => {
    res.render(process.cwd() + '/views/admin', { denuncias :[{id:1, descricao :"Todos as descriçõe",email :"Teste@123.com",data: '25/02/2089',status:"Solucionada", responsavel:" Leonardo"},
    {id:2, descricao :"Acusação de agressão no lab 3 por um aluno de botanica",email :"rafael.sozua@uniriotec..com",data: '25/02/2089',status:"Cancelada", responsavel:" Rafael", observacao: "Ver as camneras do laboratiorio"},
    {id:1, descricao :"Teste 3",email :"Teste@123.com",data: '25/02/2089',status:"Revisao", responsavel:" Andrezza", observacao: ""}  ]});
});


// POST routes:
router.post('/', (req,res) => {
    let auxDenuncia = {};
    auxDenuncia.descricao = req.body.descricao;
    auxDenuncia.email = req.body.email;
    auxDenuncia.visibilidade = req.body.visibilidade;
    if(!auxDenuncia.descricao || !auxDenuncia.email || auxDenuncia.descricao == "" || auxDenuncia.email == "" || !auxDenuncia.visibilidade || auxDenuncia.visibilidade == "") {
        console.log("Denúncia com problema." + auxDenuncia.descricao + " " + auxDenuncia.email + " " + auxDenuncia.visibilidade);
        res.render(process.cwd() + '/views/', {}); // TODO: RENDER error FLASH MESSAGE
        return;
    }
    axios.post(appConfig.apiHost + ":" + appConfig.apiPort + "/", auxDenuncia) // Exemplo de formato do primeiro argumento: "http://localhost:3000/"
        .then((apiResponse) => {
            console.log("Resposta da API: " + apiResponse.status);
            res.render(process.cwd() + '/views/', {}); // TODO: RENDER success FLASH MESSAGE
        })
        .catch((err) => {
            console.log(err);
        });
});

module.exports = router;
