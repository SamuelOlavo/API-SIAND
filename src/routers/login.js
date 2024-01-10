const express = require("express");
const router = express.Router();
const controller = require("../controllers/LGControl");

//get
router.get("/", controller.getAll);

router.get("/email/:email", controller.ByEmail);

router.get("/senha/:senha", controller.BySenha);


module.exports = router;