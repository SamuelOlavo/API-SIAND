const Users = require("../models/users");
const bcrypt = require('bcrypt');



exports.getAll = (req, res) => {
    console.log("Get All");
    res.send("OK GET ALL");
};


// exports.Auth = async (req, res) => {
//     const email = req.body.email;
//     const senha = req.body.senha;
//     const user = await loginService.AuthUser(email, senha);
//     if(!user)
//     return res.status(400).send({error: 'Usuario nao encontrado'})
// };

exports.Auth = async (req, res) => {
    const {email , senha } = req.body;
    const user = await Users.findOne({email, senha});

    if(!user) {
        res.status(400).send({error: 'Usuario nao cadastrado' });
        return;
    }

    // Enviar todas as informações do usuário na resposta
    res.send(user);
};
