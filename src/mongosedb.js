const mongoose = require('mongoose');

//chamando a biblioteca dotenv para proteger os dados sensiveis
require('dotenv').config();

//buscando as informacoes do arquivo .env
const user = process.env.MONGODB_USER;
const pass = process.env.MONGODB_PASSWORD;
const database = process.env.MONGODB_DATABASE;
const serverName = process.env.MONGODB_SERVER;

module.exports = {
    init: () => {
        mongoose
        .connect(
            `mongodb+srv://${user}:${pass}@${serverName}/${database}?retryWrites=true&w=majority`        
        )
        .then((res) => console.log(`Conection Succesful ${res}`))
        .catch((err) => console.log(`Erro in DB Conection ${err}`));
    },
};


// mongoose.connect('mongodb+srv://samuelobt:b7PQAu02ygvNEc9C@agenda-api.2vl3jg7.mongodb.net/?retryWrites=true&w=majority');