// controllers/authController.js
const authService = require('../service/authService');

exports.login = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const user = await authService.login(email, senha);

        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas' });
        }

        // Credenciais válidas, gerar token JWT
        const token = authService.generateToken(user._id);

        // Enviar token como resposta
        res.json({ token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
