const mongoose = require('mongoose');
const { use } = require('./routers');

const user = "samuelobt";
const pass = "b7PQAu02ygvNEc9C";
const database = "API-AGENDA";
const serverName = "agenda-api.2vl3jg7.mongodb.net"

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