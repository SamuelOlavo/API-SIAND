const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Users = require("../models/users");


require('dotenv').config();

const secretKey = process.env.SECRETKEY;

exports.getAll = (req, res) => {
    console.log("Get All");
    res.send("OK GET ALL");
};

async function login(email, senha) {
    try {
        const user = await Users.findOne({ email: email });

        if (!user) {
            return null; // Usuário não encontrado
        }

        const passwordMatch = await bcrypt.compare(senha, user.senha);

        if (!passwordMatch) {
            return null; // Senha incorreta
        }

        return user; // Credenciais válidas
    } catch (error) {
        throw new Error(`Login failed: ${error.message}`);
    }
}

function generateToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
}

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await login(email, senha);

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Credenciais válidas, gerar token JWT
        const token = generateToken(user._id);

        // Enviar token como resposta
        res.json({token, user: {_id: user._id, nome: user.nome, email: user.email, Administrador: user.Administrador}});
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

function generateToken(userId) {
    const token = jwt.sign({ userId }, secretKey, { expiresIn: '1h' });
    return token;
}

// Função para autenticação do Google
exports.authGoogle = async (req, res) => {
    const { idToken } = req.body;
    // Decodificando o token JWT recebido do frontend
    const tokenDecodificado = jwt.decode(idToken);
    const { sub, email, name, email_verified } = tokenDecodificado;

    // Verificando se o email foi verificado
    if (!email_verified) {
        console.log('Email não verificado');
        res.status(400).send({ error: 'Email não verificado' });
        return;
    }

    // Verifica se já existe um usuário com o mesmo email no banco de dados
    //Retorno 200 Existe user no banco 201 user novo
    const usuarioExistente = await Users.findOne({ email: email });
    if (usuarioExistente) {   
        // Credenciais válidas, gerar token JWT
        const token = generateToken(usuarioExistente._id);
        res.status(200).send({ user: usuarioExistente, token }); // Envia o usuário e o token como resposta
    } else {
        const senhaHash = await bcrypt.hash(sub, 10);
        const newUser = new Users({
            nome: name,
            email: email,
            senha: senhaHash,
        });
        await newUser.save();
        // Credenciais válidas, gerar token JWT
        const token = generateToken(newUser._id);
        res.status(201).json({ user: newUser, token }); // Envia o novo usuário e o token como resposta
    };
};




