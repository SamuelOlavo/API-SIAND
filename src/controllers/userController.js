const bcrypt = require('bcrypt');
const User = require('../models/users'); //banco
const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRETKEY;

exports.getAll = async (req, res) => {
    try {
        const users =  await User.find({}, 'email senha' );
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.get = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.add = async (req, res) => {
    try {
        // Verifica se o email já está em uso
        const existingUser = await User.findOne({ email: req.body.email });
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }
        // Se o email não está em uso, cria um novo usuário
        const hashedPassword = await bcrypt.hash(req.body.senha, 6);
        const newUser = new User({
            nome: req.body.nome,
            email: req.body.email,
            senha: hashedPassword,
        });
        await newUser.save();
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.update = async (req, res) => {
    const token = req.headers.authorization;
    const userId = req.params.id;
    let updatedUser = req.body;

    jwt.verify(token, secretKey, async (err, decoded) => {
        if (err) {
            // Se houver um erro na verificação do token, retorne um erro
            res.status(401).json({ error: "Token inválido" });
        } else {
            // Se a senha foi fornecida, criptografe-a antes de atualizar o usuário
            if (updatedUser.senha) {
                const hashedPassword = await bcrypt.hash(updatedUser.senha, 6);
                updatedUser.senha = hashedPassword;
            }

            try {
                const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
                res.json(result);
            } catch (error) {
                res.status(500).json({ error: error.message });
            }
        }
    });
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    const token = req.headers.authorization;
    try {

        jwt.verify(token, secretKey, async (err, decoded) => {
            if (err) {
                res.status(401).json({ error: 'Token inválido' });
            } else {
        const deleteResponse = await User.deleteOne({_id: id});
        res.json(deleteResponse);
         } 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.byEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email: email });
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
