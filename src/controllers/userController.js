const bcrypt = require('bcrypt');
const User = require('../models/users');

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
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
        const result = await User.findByIdAndUpdate(userId, updatedUser, { new: true });
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const id = req.params.id;
    try {
        const deleteResponse = await User.deleteOne({_id: id});
        res.json(deleteResponse);
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
