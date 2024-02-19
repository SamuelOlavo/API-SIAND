const Users = require("../models/users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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
    
    // Verificando se o email foi verificado
    if (!email_verified) {
        console.log('Email não verificado');
        res.status(400).send({ error: 'Email não verificado' });
        return;
    }
// Verifica se já existe um usuário com o mesmo sub ou email no banco de dados
const usuarioExistente = await Users.findOne({ $or: [{ sub: sub }, { email: email }] });
if (usuarioExistente) {
    // Se já existir um usuário com o mesmo sub ou email, envie uma resposta de erro para o cliente
    console.log('Usuário já cadastrado');
    res.status(400).send({ error: 'Usuário já cadastrado' });
    return; // Encerra a execução da função
}

// Se o sub e o email não existirem no banco de dados, proceda com a lógica abaixo
if (!sub || !email) {
    // Se o ID do Google ou o email não foram encontrados, envie uma resposta de erro para o cliente
    console.log('Sub ou email não encontrado');
    res.status(400).send({ error: 'sub ou email não encontrado' });
    return; // Encerra a execução da função
}

    // Verifica se já existe um usuário com o mesmo sub ou email no banco de dados
    const UsuárioExistente = await Users.findOne({ $or: [{ sub: sub }, { email: email }] });
    console.log('UsuárioExistente:', UsuárioExistente);

    if (UsuárioExistente) {
        // Se já existir um usuário com o mesmo sub ou email, envie uma resposta de erro para o cliente
        console.log('Usuário já cadastrado');
        res.status(400).send({ error: 'Usuário já cadastrado' });
        return;
    }

    // Se o sub e o email não existirem no banco de dados, proceda com o cadastro do novo usuário
    const newUser = new Users({
        email: email,
        nome: name,
        sub: sub,
        senha: sub
    });

    try {
        // Salva o novo usuário no banco de dados
        const savedUser = await newUser.save();
        console.log('Usuário salvo:', savedUser);

        // Gera um token de autenticação
        const token = generateToken(savedUser._id);
        console.log('Token gerado:', token);

        // Retorna o token e os dados do usuário para o cliente
        res.status(200).send({ token, user: savedUser });
    } catch (error) {
        // Se ocorrer um erro durante o cadastro do usuário, envie uma resposta de erro para o cliente
        console.error('Erro ao cadastrar o usuário:', error);
        res.status(500).send({ error: 'Erro ao cadastrar o usuário' });
    }
};
