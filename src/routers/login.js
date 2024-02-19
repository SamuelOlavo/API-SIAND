// routes/login.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const loginController = require('../controllers/loginControl');

// Rota para fazer login e obter token JWT
router.post('/', authController.login);

// Rota para autenticação do Google
router.post('/authGoogle', loginController.authGoogle);

module.exports = router;