const express = require("express");
const router = express.Router();
const controller = require("../controllers/agendaControl");

//get
router.get("/", controller.getAll);

router.get("/:Esteticista", controller.ByProf);

// router.get("/nome/:nome", controller.ByNome);

router.post("/", controller.add);

// router.put("/:id", controller.update);

// router.delete("/:id", controller.delete);

module.exports = router;