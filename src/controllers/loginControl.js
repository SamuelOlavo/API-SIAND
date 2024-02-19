const Users = require("../models/users");
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

exports.getAll = (req, res) => {
    console.log("Get All");
    res.send("OK GET ALL");
};

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

// Função para autenticação do Google
exports.authGoogle = async (req, res) => {
    const { idToken } = req.body;
    console.log('idToken:', idToken);

    try {
        // Decodificar o token JWT
        const decodedToken = jwt.verify(idToken, process.env.SECRETKEY);
        console.log('decodedToken:', decodedToken);

        // Extrair informações do usuário do token decodificado
        const { sub, email, name, picture } = decodedToken;

        // Verificar se o usuário já existe no banco de dados
        let user = await User.findOne({ googleId: sub });

        // Se o usuário não existir, criar um novo registro
        if (!user) {
            user = await User.create({
                googleId: sub,
                email,
                name,
                picture,
                // Outros campos que você pode querer salvar
            });
        }

        // Retornar o usuário como resposta
        res.json({ user });
    } catch (error) {
        console.error('Erro ao autenticar usuário do Google:', error);
        res.status(500).json({ error: 'Erro ao autenticar usuário do Google' });
    }
};
