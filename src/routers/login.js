// routes/login.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');


// Rota para fazer login e obter token JWT
router.post('/', authController.login);

// Rota para autenticação do Google
router.post('/authGoogle', authController.authGoogle);

module.exports = router;