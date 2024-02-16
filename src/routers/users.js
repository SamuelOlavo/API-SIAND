// routes/users.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Rota para obter todos os usuários
router.get('/', userController.getAll);

// Rota para obter um usuário por ID
router.get('/:id', userController.get);

// Rota para criar um novo usuário
router.post('/', userController.add);

// Rota para atualizar um usuário
router.put('/:id', userController.update);

// Rota para excluir um usuário
router.delete('/:id', userController.delete);

// Rota para obter um usuário por e-mail
router.get('/byEmail/:email', userController.byEmail);

module.exports = router;