// const userService = require("../service/usersService");
const Agendas = require("../models/agenda");


exports.ByProf = async (req, res) => {
  let nome_prof = req.params.Esteticista;

  try {
    const agenda = await Agendas.find({Esteticista: nome_prof}).select("-_id  Servicos");
    res.json(agenda);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.getAll = async (req, res) => {
      try {
           const agenda = await Agendas.find();

      if (!agenda) {
        return res.status(404).json("Ola TEste !");  
        
      }  
      res.json(agenda);
    } catch (err) {
      return res.status(500).json({ error: err });
    }
};

exports.add = async (req, res) => {
  try {
    const agendamento =  {};
    agendamento.NomeCliente = req.body.NomeCliente;
    agendamento.DataNascimento = req.body.DataNascimento;
    agendamento.Telefone = req.body.Telefone;
    agendamento.Esteticista = req.body.Esteticista;
    agendamento.Servicos = req.body.Servicos;
    agendamento.Data = req.body.Data;
    agendamento.Horario = req.body.Horario;

    const creatagenda = new Agendas(agendamento);
    await creatagenda.save();

    res.status(201).json(creatagenda);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.Prof = async (req, res) => {
  try {
    // Utilize o método distinct para obter apenas os nomes únicos de esteticistas
    const esteticistas = await Agendas.distinct('Esteticista');
    
    if (!esteticistas || esteticistas.length === 0) {
      return res.status(404).json("Nenhuma esteticista encontrada.");  
    }

    res.json(esteticistas.map(nome => ({ nome })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

// exports.update = async (req, res) => {
//     let id = req.params.id;
  
//     try {
//       const user = {};
//       user.nome = req.body.nome;
//       user.email = req.body.email;
//       user.senha = req.body.senha;
  
//       const updateduser = await userService.updateUsers(id, user);
  
//       if (updateduser.nModified === 0) {
//         return res.status(404).json({});
//       }
  
//       res.json(updateduser);
//     } catch (error) {
//       res.status(500).json({ error: error });
//     }
// };

// exports.delete = async (req, res) => {
//     let id = req.params.id;
  
//     try {
//       const deleteResponse = await userService.deleteUsers(id);
//       res.json(deleteResponse);
//     } catch (error) {
//       res.status(500).json({ error: error });
//     }
//   };

// exports.ByEmail = async (req, res) => {
//     const email = req.params.email;
//     const user = await userService.emailUsers(email);
//     if (user) {
//         res.json(user);        
//     } else {
//         res.status(404).send('Usuário não encontrado');
//     }
//   };