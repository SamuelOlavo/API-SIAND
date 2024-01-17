// controllers/userController.js
const userService = require('../service/userService');

exports.getAll = async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.get = async (req, res) => {
    const userId = req.params.id;
    try {
        const user = await userService.getUsersbyId(userId);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.add = async (req, res) => {
    try {
        // Verifica se o email já está em uso
        const existingUser = await userService.emailUsers(req.body.email);
        
        if (existingUser) {
            return res.status(400).json({ error: 'Email já está em uso.' });
        }

        // Se o email não está em uso, cria um novo usuário
        const newUser = await userService.addUsers(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.update = async (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;

    try {
        const result = await userService.updateUsers(userId, updatedUser);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.delete = async (req, res) => {
    const userId = req.params.id;

    try {
        const deletedUser = await userService.deleteUsers(userId);
        res.json(deletedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.byEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await userService.emailUsers(email);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
