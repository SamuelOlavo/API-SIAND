// const userService = require("../service/usersService");
const Servicos = require("../models/servicos");


exports.getAll = async (req, res) => {
  try {
       const servico = await Servicos.find();

  if (!servico) {
    return res.status(404).json("Ola TEste !");  
    
  }  
  res.json(servico);
} catch (err) {
  return res.status(500).json({ error: err });
}
};



exports.AllProf = async (req, res) => {
  try {
    // Utilize o método distinct para obter apenas os nomes únicos de esteticistas
    const esteticistas = await Servicos.distinct('Esteticista');
    
    if (!esteticistas || esteticistas.length === 0) {
      return res.status(404).json("Nenhuma esteticista encontrada.");  
    }

    res.json(esteticistas.map(nome => ({ nome })));
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.AllServ = async (req, res) => {
  try {
    // Utilize o método find para obter todos os documentos de Agendas
    const response = await Servicos.find({}, '-_id Esteticista Servicos');

    if (!response || response.length === 0) {
      return res.status(404).json("Nenhuma esteticista/serviço encontrado.");
    }

    res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


exports.ByServ = async (req, res) => {
  let serv = req.params.Servicos;

  try {
    const response = await Servicos.find({Servicos: serv}).select("-_id  Esteticista");
    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// exports.ByProf = async (req, res) => {
//   let nome_prof = req.params.Esteticista;

//   try {
//     const agenda = await Agendas.find({Esteticista: nome_prof}).select("-_id  Servicos");
//     res.json(agenda);
//   } catch (error) {
//     res.status(500).json({ error: error });
//   }
// };



exports.add = async (req, res) => {
  try {
    const servico =  {};
    servico.Esteticista = req.body.Esteticista;
    servico.Servicos = req.body.Servicos;
    
    const creatservicos = new Servicos(servico);
    await creatservicos.save();

    res.status(201).json(creatservicos);
  } catch (error) {
    res.status(500).json({ error: error });
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