// SEU_NOME_DE_ARQUIVO.js

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/users');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

async function login(email, senha) {
    try {
        const user = await User.findOne({ email: email });

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