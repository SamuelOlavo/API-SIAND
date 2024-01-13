const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// //Esquema do banco
 const servicosSchema = Schema ({
      Esteticista: {
        type: String,
        required: true,
      },
      Servicos: {
        type: String,
        required: true,
      } 
    });

module.exports = Servicos = mongoose.model("servico", servicosSchema);
