const express = require("express");
const app = express();
const mysql = require("mysql");

// const db = mysql.createConnection({
//   user: "root",
//   host: "localhost",
//   password: "",
//   database: "employeesystem",
// });

// app.post('/create',(req,res) => {

// })

app.get("/", (req, res) => {
  res.status(200).send("Home Page");
});

app.listen(3001, () => {
  console.log("listening on port 3001");
});
