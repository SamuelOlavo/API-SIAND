// Importa o módulo 'express' para criar e configurar o servidor web
const express = require('express');
// Importa o módulo 'cors' para lidar com políticas de mesma origem (Cross-Origin Resource Sharing)
const cors = require('cors');
// Importa o módulo 'body-parser' para fazer o parsing do corpo das requisições
const bodyParser = require('body-parser');
// Cria uma instância do servidor Express
const app = express();

// Middleware: Configura o servidor para interpretar o corpo da requisição como JSON
app.use(express.json());
// Middleware: Adiciona o 'body-parser' para fazer parsing do corpo das requisições
app.use(bodyParser.json());
// Middleware: Habilita o CORS para permitir requisições de diferentes origens
app.use(cors());

// Importa os módulos contendo as rotas da aplicação
const indexRoute = require("./routers/index");      // Rota principal
const cadasRoute = require("./routers/users");      // Rotas relacionadas a usuários
const loginRoute = require("./routers/login");      // Rotas relacionadas a autenticação/login
const agendaRoute = require("./routers/agenda");    // Rotas relacionadas a agendas
const servicosRoute = require("./routers/servicos"); // Rotas relacionadas a serviços

// Associa as rotas aos caminhos correspondentes
// app.use("/", indexRoute);
app.use("/users", cadasRoute);
app.use("/login", loginRoute);
app.use("/agenda", agendaRoute);
app.use("/servicos", servicosRoute);

// Exporta a instância do servidor Express configurada com as rotas
module.exports = app;