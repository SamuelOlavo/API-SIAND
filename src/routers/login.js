const express = require("express");
const router = express.Router();
const controller = require("../controllers/loginControl");

//get
router.get("/", controller.getAll);

router.post("/", controller.Auth);

// router.get("/email/:email", controller.ByEmail);

// router.get("/senha/:senha", controller.BySenha);


module.exports = router;