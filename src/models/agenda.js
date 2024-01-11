const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //Esquema do banco
 const agendaSchema = Schema ({
      NomeCliente: {
        type: String,
        required: true,
      },
      DataNascimento: {
        type: String,
        required: true,
      },
      Telefone: {
        type: Number,
        required: true,
      },
      Esteticista: {
        type: String,
        required: true,
      },
      Servicos: {
        type: String,
        required: true,
      },
      Data: {
        type: String,
        required: true,
      },
      Horario: {
        type: String,
        required: true,
      },
    });

module.exports = Agendas = mongoose.model("agenda", agendaSchema);
