const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
    console.log("Ola teste ")
    res.send("Sou o teste na raiz do barra /")
});

module.exports = router;