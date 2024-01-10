const loginService = require("../service/loginService");


exports.getAll = (req, res) => {
    console.log("Get All");
    res.send("OK GET ALL");
}

exports.ByEmail = async (req, res) => {
    const email = req.params.email;
    const user = await loginService.emailUsers(email);
    if (user) {
        res.json(user);        
    } else {
        res.status(404).send('Usuário não encontrado');
    }
  };
  
  exports.BySenha = async (req, res) => {
    const senha = req.params.senha;
    const user = await loginService.senhaUsers(senha);
    if (user) {
        res.json(user);        
    } else {
        res.status(404).send('Senha não encontrado');
    }
  };