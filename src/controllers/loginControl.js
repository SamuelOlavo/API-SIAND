const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { redirect } = require("express/lib/response");

exports.getAll = (req, res) => {
    console.log("Get All");
    res.send("OK GET ALL");
};

exports.Auth = async (req, res) => {
    const { email, senha } = req.body;
    const user = await Users.findOne({ email, senha });

    if (!user) {
        res.status(400).send({ error: 'Usuario nao cadastrado' });
        return;
    }
    // Enviar todas as informações do usuário na resposta
    res.send(user);
};















// Função para autenticação do Google
exports.authGoogle = async (req, res) => {
    const { idToken } = req.body;

    // Decodificando o token JWT recebido do frontend
    const tokenDecodificado = jwt.decode(idToken);
    console.log('tokenDecodificado:', tokenDecodificado);

    const { sub, email, name, email_verified } = tokenDecodificado;

    console.log('sub:', sub);
    console.log('email:', email);
    console.log('name:', name);
    console.log('email_verified:', email_verified);

    console.log('inicializando a verificacao do email');

    // Verificando se o email foi verificado
    if (!email_verified) {
        console.log('Email não verificado');
        res.status(400).send({ error: 'Email não verificado' });
    }
    
    // Verifica se já existe um usuário com o mesmo email no banco de dados
    const usuarioExistente = await Users.findOne({ email: email });
    if (usuarioExistente) {
        // Se já existir um usuário com o mesmo email, envie uma resposta de erro para o cliente
        console.log('Usuário já cadastrado');
        const users = await Users.findOne({ email: email });
        res.status(200).send(users); // Envia os usuários como resposta
        // console.log(users);
    }
    // Se o sub e o email não existirem no banco de dados.
    if (!sub || !email) {
        // Se o ID do Google ou o email não foram encontrados, envie uma resposta de erro para o cliente
        console.log('Sub ou email não encontrado');
        res.status(400).send({ error: 'sub ou email não encontrado' });
        console.log('Sub ou email não encontrado');

        // Gerar hash seguro da senha
        const senhaHash = await bcrypt.hash(sub, 10);
        const newUser = new Users({
            nome: name,
            email: email,
            senha: senhaHash,
        });
        await newUser.save();
        res.status(201).json(newUser);
    };
};

    // Se o sub e o email não existirem no banco de dados.
    // if (!sub || !email) {
    //     // Se o ID do Google ou o email não foram encontrados, envie uma resposta de erro para o cliente
    //     console.log('Sub ou email não encontrado');
    //     res.status(400).send({ error: 'sub ou email não encontrado' });

    //     // Gerar hash seguro da senha
    //     const senhaHash = await bcrypt.hash(sub, 10);

    //     const newUser = new Users({
    //         email: email,
    //         nome: name,
    //         sub: sub,
    //         senha: senhaHash,

    //         // Se o sub e o email não existirem no banco de dados, proceda com o cadastro do novo usuário
    //     });

    //     try {
    //         // Salva o novo usuário no banco de dados
    //         const savedUser = await newUser.save();
    //         console.log('Usuário cadastrado:', savedUser);
        
    //     // Retorna o token e os dados do usuário para o cliente
    //     res.status(200).send({ token, user: savedUser });
    //     }
    //     catch (error) {
    //         console.log('Erro ao cadastrar usuário:', error);
    //         res.status(400).send({ error: 'Erro ao cadastrar usuário' });
    //     }}
    
