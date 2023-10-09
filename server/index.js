const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "Supergostek1",
  database: "employeesystem",
});

app.get("/products", (req, res) => {
  db.query(
    "SELECT Name, Material, UnitPrice, Category, Amount FROM OBJECT",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

// app.post('/create',(req,res) => {

// })

// app.get("/", (req, res) => {
//   res.status(200).send("Home Page");
// });

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
