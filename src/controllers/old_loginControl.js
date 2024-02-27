// const Users = require("../models/users");
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// const { redirect } = require("express/lib/response");

// exports.getAll = (req, res) => {
//     console.log("Get All");
//     res.send("OK GET ALL");
// };

// exports.Auth = async (req, res) => {
//     const { email, senha } = req.body;
//     const user = await Users.findOne({ email, senha });

//     if (!user) {
//         res.status(400).send({ error: 'Usuario nao cadastrado' });
//         return;
//     }
//     // Enviar todas as informações do usuário na resposta
//     res.send(user);
// };

// // Função para autenticação do Google
// exports.authGoogle = async (req, res) => {
//     const { idToken } = req.body;
//     // Decodificando o token JWT recebido do frontend
//     const tokenDecodificado = jwt.decode(idToken);
//     // console.log('tokenDecodificado:', tokenDecodificado);
//     const { sub, email, name, email_verified } = tokenDecodificado;

//     // Verificando se o email foi verificado
//     if (!email_verified) {
//         console.log('Email não verificado');
//         res.status(400).send({ error: 'Email não verificado' });
//     }
    
//     // Verifica se já existe um usuário com o mesmo email no banco de dados
//     const usuarioExistente = await Users.findOne({ email: email });
//     if (usuarioExistente) {
//         // Se já existir um usuário com o mesmo email, envie uma resposta de erro para o cliente
//         // console.log('Usuário já cadastrado');
//         res.status(200).send(usuarioExistente); // Envia o usuário como resposta
//     } else {
//         const senhaHash = await bcrypt.hash(sub, 10);
//         const newUser = new Users({
//             nome: name,
//             email: email,
//             senha: senhaHash,
//         });
//         await newUser.save();
//         res.status(201).json(newUser);
//     };
// };