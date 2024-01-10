const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //Esquema do banco
 const UserSchema = Schema ({
      nome: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      senha: {
        type: String,
        required: true,
      },
    });

module.exports = Users = mongoose.model("user", UserSchema);

// app.post("/login/", async (req, res) => {
//     const users = new Users({
//         nome: req.body.nome,
//         senha: req.body.senha,        
//     })
//     await users.save()
//     res.send(users)
// })   