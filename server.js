const express = require('express');
const path = require("path");
const appConfig = require(process.cwd() + '/configs/appConfig.json');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs'); // Mudamos a plataforma de templates de PUG (default do express) para EJS.


// Servir arquivos estáticos (stylesheets, scripts, mídia, etc):
app.use(express.static(path.join(__dirname, '/static')));

// Body parser para interpretar os Posts:
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

// Rotas:
app.use('/', require(process.cwd() + '/routes/index.js'));

app.listen(appConfig.serverPort, () => {
    console.log("Server iniciado. Porta: " + appConfig.serverPort);
});