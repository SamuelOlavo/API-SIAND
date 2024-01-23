const express = require("express");
const router = express.Router();
const controller = require("../controllers/servicosControl");

//get traz todas informações do banco 
router.get("/", controller.getAll);

//get para buscar lista de todas esteticistas
router.get('/profissional', controller.AllProf);

//get para buscar lista de todos Servicos com Esteticistas
router.get('/servicos', controller.AllServ);

//get busca lista de Profissionais para aquele Serviço
router.get("/servico/:Servicos", controller.ByServ);

//get busca lista de Serviços para aquele esteticista
router.get("/esteticista/:Esteticista", controller.ByProf);

//post para adicionar dados na tabela Agenda
router.post("/", controller.add);

router.delete("/excluir/", controller.deleteMany);

router.delete("/:id", controller.delete);





module.exports = router;