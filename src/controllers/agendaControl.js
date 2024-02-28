// const userService = require("../service/usersService");
const Agendas = require("../models/agenda");

exports.getAll = async (req, res) => {
  try {
    // Suponha que 'nomeEsteticista' seja o nome do parâmetro que você está passando
    const Esteticista = req.query.Esteticista;

    let query = {};
    // Se 'nomeEsteticista' for fornecido, adicione-o ao objeto de consulta
    if (Esteticista) {
      query.Esteticista = Esteticista;
    }
    const agenda = await Agendas.find(query).sort({Data: 1});

    if (!agenda) {
      return res.status(404).json("Ola TEste !");
    }

    res.json(agenda);
  } catch (err) {
    return res.status(500).json({ error: err });
  }
};

exports.AllProf = async (req, res) => {
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

exports.AllServ = async (req, res) => {
  try {
    // Utilize o método find para obter todos os documentos de Agendas
    const response = await Agendas.find({}, '-_id Esteticista Servicos');

    if (!response || response.length === 0) {
      return res.status(404).json("Nenhuma esteticista/serviço encontrado.");
    }

    res.json(response);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


// exports.ByServ = async (req, res) => {
//  let nome_prof = req.params.Esteticista;

//  try {
//    const agenda = await Agendas.find({Esteticista: nome_prof});
//    res.json(agenda);
//  } catch (error) {
//    res.status(500).json({ error: error });
 // }
//};
//
exports.ByServ = async (req, res) => {
  let nome_prof = req.params.Esteticista;
  let dataFiltro = req.body.Data; // Obtendo a data do corpo da requisição

  try {
    const agenda = await Agendas.find({
      Esteticista: nome_prof,
      Data: dataFiltro // Filtrando pela data exata
    }).sort({Horario: 1}); // Ordenando pela data de forma decrescente

    res.json(agenda); // Retornando todos os agendamentos da data especificada
  } catch (error) {
    res.status(500).json({ error: error });
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
    if (req.body.Remarcar) agendamento.Remarcar = req.body.Remarcar;
    if (req.body.Anotacoes) agendamento.Anotacoes = req.body.Anotacoes;

    const creatagenda = new Agendas(agendamento);
    await creatagenda.save();

    res.status(201).json(creatagenda);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};



exports.update = async (req, res) => {
  try {
    let agendamento = await Agendas.findById(req.params.id);

    if (!agendamento) {
      return res.status(404).json({ message: 'Agendamento não encontrado' });
    }

    if (req.body.NomeCliente) agendamento.NomeCliente = req.body.NomeCliente;
    if (req.body.DataNascimento) agendamento.DataNascimento = req.body.DataNascimento;
    if (req.body.Telefone) agendamento.Telefone = req.body.Telefone;
    if (req.body.Esteticista) agendamento.Esteticista = req.body.Esteticista;
    if (req.body.Servicos) agendamento.Servicos = req.body.Servicos;
    if (req.body.Data) agendamento.Data = req.body.Data;
    if (req.body.Horario) agendamento.Horario = req.body.Horario;
    if (req.body.Remarcar) agendamento.Remarcar = req.body.Remarcar;
    if (req.body.Anotacoes) agendamento.Anotacoes = req.body.Anotacoes;

    await agendamento.save();

    res.status(200).json(agendamento);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};


exports.delete = async (req, res) => {
    let id = req.params.id;  
    try {
      const deleteResponse = await Agendas.deleteOne({_id: id});
      res.json(deleteResponse);
    } catch (error) {
      res.status(500).json({ error: error });
    }
  };
