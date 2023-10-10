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
    "SELECT ObjectSID, Name, Material, UnitPrice, Category, Amount FROM OBJECT",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.post("/products/cartadd", async (req, res) => {
  const id = req.body.ObjectSID;
  const amount = req.body.Amount;

  try {
    // Function to execute a query and return a Promise
    const executeQuery = (sql, params = []) => {
      return new Promise((resolve, reject) => {
        db.query(sql, params, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        });
      });
    };

    // Query 1: Get itemCount
    const itemCountResult = await executeQuery(
      "SELECT COUNT(CARGOID) as itemCount FROM ITEMS"
    );
    const itemCount = itemCountResult[0].itemCount + 1;

    // Query 2: Get orderCount
    const orderCountResult = await executeQuery(
      "SELECT COUNT(ORDERNUMBER) as orderCount FROM `ORDER`"
    );
    const orderCount = orderCountResult[0].orderCount + 1;

    // Query 3: Get itemsPrice
    const itemsPriceResult = await executeQuery(
      "SELECT UnitPrice as itemsPrice FROM OBJECT WHERE OBJECTSID = ?",
      [id]
    );
    const itemsPrice = itemsPriceResult[0].itemsPrice * amount;

    // Insert into ITEMS
    await executeQuery(
      "INSERT INTO ITEMS (CargoId, Amount, Object_ObjectSID, Price, OrderId, Status) VALUES(?, ?, ?, ?, ?, ?)",
      [itemCount, amount, id, itemsPrice, orderCount, 0]
    );

    res.send("Added to Cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to Cart");
  }
});

// app.post('/create',(req,res) => {

// })

// app.get("/", (req, res) => {
//   res.status(200).send("Home Page");
// });

app.listen(3001, () => {
  console.log("Listening on port 3001");
});
