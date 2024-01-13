const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();


app.use(express.json())
app.use(bodyParser.json());
app.use(cors()); 

const indexRoute = require("./routers/index");      // chamada da rota
const cadasRoute = require("./routers/users");
const loginRoute = require("./routers/login");
const agendaRoute = require("./routers/agenda");
const servicosRoute = require("./routers/servicos");


app.use("/", indexRoute);
app.use("/users", cadasRoute);
app.use("/login", loginRoute);
app.use("/agenda", agendaRoute);
app.use("/servicos", servicosRoute);


module.exports = app;