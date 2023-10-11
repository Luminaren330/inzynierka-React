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

app.get("/products/cart", (req, res) => {
  db.query(
    "SELECT ITEMS.OBJECT_OBJECTSID, ITEMS.CargoId, OBJECT.Name as ObjectName, ITEMS.Amount, ITEMS.Price FROM ITEMS INNER JOIN OBJECT ON ITEMS.Object_ObjectSID = OBJECT.ObjectSID WHERE ITEMS.Status =0",
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
      "SELECT MAX(CARGOID) as itemCount FROM ITEMS"
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

    const objectAmountResult = await executeQuery(
      "SELECT AMOUNT as objectAmount FROM OBJECT WHERE ObjectSID = ?",
      [id]
    );
    const objectAmount = objectAmountResult[0].objectAmount;

    await executeQuery("UPDATE OBJECT SET AMOUNT = ? - ? WHERE OBJECTSID = ?", [
      objectAmount,
      amount,
      id,
    ]);

    // Insert into ITEMS
    await executeQuery(
      "INSERT INTO ITEMS (CargoId, Amount, Object_ObjectSID, Price, OrderId, Status) VALUES(?, ?, ?, ?, ?, ?)",
      [itemCount, amount, id, itemsPrice, orderCount, 0]
    );
    console.log("Added to cart");
    res.send("Added to Cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to Cart");
  }
});

app.delete("/products/deletecart/:id", async (req, res) => {
  const id = req.params.id;

  try {
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
    const objectSidResult = await executeQuery(
      "SELECT Object_ObjectSID as objectSid FROM ITEMS WHERE CargoId = ?",
      [id]
    );
    const objectSid = objectSidResult[0].objectSid;

    const cartAmountResult = await executeQuery(
      "SELECT AMOUNT aS cartAmount FROM ITEMS WHERE CargoId = ?",
      [id]
    );
    const cartAmount = cartAmountResult[0].cartAmount;

    await executeQuery(
      "UPDATE OBJECT SET AMOUNT = AMOUNT + ? WHERE ObjectSID = ?",
      [cartAmount, objectSid]
    );

    await executeQuery("DELETE FROM ITEMS WHERE CargoId = ?", [id]);

    console.log("Deleted from cart");
    res.send("Deleted from cart");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting from cart");
  }
});

app.post("/makeorder/createorder", async (req, res) => {
  const phoneNumber = req.body.phoneNumber;
  const address = req.body.address;
  const zipcode = req.body.zipcode;
  const name = req.body.name;

  try {
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

    const clientIdResult = await executeQuery(
      "SELECT COUNT(CLIENTID) as clientId FROM CLIENT"
    );
    const clientId = clientIdResult[0].clientId + 1;
    await executeQuery("INSERT INTO CLIENT VALUES (?,?,?,?,?)", [
      clientId,
      phoneNumber,
      address,
      zipcode,
      name,
    ]);

    const workerCountResult = await executeQuery(
      "SELECT COUNT(WORKERID) as workerCount FROM WORKER"
    );
    const workerCount = workerCountResult[0].workerCount;
    const worker = Math.floor(Math.random() * workerCount) + 1;

    const orderIdResult = await executeQuery(
      "SELECT ORDERID as orderId FROM ITEMS WHERE STATUS = 0 LIMIT 1"
    );
    const orderId = orderIdResult[0].orderId;

    const orderCountResult = await executeQuery(
      "SELECT COUNT(ORDERID) as orderCount FROM `ORDER`"
    );
    const orderCount = orderCountResult[0].orderCount + 1;

    const totalPriceResult = await executeQuery(
      "SELECT SUM(PRICE) as totalPrice FROM ITEMS WHERE ORDERID = ?",
      [orderId]
    );
    const totalPrice = totalPriceResult[0].totalPrice;

    await executeQuery("INSERT INTO `ORDER` VALUES (?, ?, ?, ?, ?, ?)", [
      orderCount,
      clientId,
      worker,
      0,
      totalPrice,
      orderId,
    ]);

    await executeQuery("UPDATE ITEMS SET STATUS = 1 WHERE ORDERID = ?", [
      orderId,
    ]);
    console.log("Added order");
    res.send("Added order");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating order");
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
