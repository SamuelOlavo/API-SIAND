const app = require("./app")
const db = require("./mongosedb");

db.init();

const port = 3000;

// //Esquema do banco
// const Users = mongoose.model('users', {
//      nome: String,
//      senha: String
//      });

// app.post("/login/", async (req, res) => {
//     const users = new Users({
//         nome: req.body.nome,
//         senha: req.body.senha,        
//     })
//     await users.save()
//     res.send(users)
// })     




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})