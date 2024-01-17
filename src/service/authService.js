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

module.exports = {
    login,
    generateToken,
};
