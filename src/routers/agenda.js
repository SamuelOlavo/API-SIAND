const express = require("express");
const router = express.Router();
const controller = require("../controllers/agendaControl");

//get traz todas informações do banco 
router.get("/", controller.getAll);

//get para buscar lista de todos esteticistas
router.get('/prof', controller.AllProf);

//get para buscar lista de todos esteticistas
router.get('/servicos', controller.AllServ);

//get busca lista de servicos dessa esteticista
router.post("/servicos/:Esteticista", controller.ByServ);

//post para adicionar dados na tabela Agenda
router.post("/", controller.add);

//update atualiza os campos da Agenda
router.put("/:id", controller.update);

//deleta o agendamento escolhido 
router.delete("/:id", controller.delete);

module.exports = router;