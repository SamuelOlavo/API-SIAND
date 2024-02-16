const express = require('express');
const app = require("./app")
const db = require("./mongosedb");
const path = require('path');



db.init();

app.use(express.static(path.join(__dirname, '../html')));

const port = 3000;


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})