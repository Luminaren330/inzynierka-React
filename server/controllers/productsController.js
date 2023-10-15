const db = require("../db");

const getProducts = (req, res) => {
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
};

const addNewProduct = async (req, res) => {
  const name = req.body.name;
  const magazine = req.body.magazine;
  const material = req.body.material;
  const unitPrice = req.body.unitPrice;
  const amount = req.body.amount;
  const category = req.body.category;

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
      "SELECT MAX(OBJECTSID) as objectSid FROM OBJECT"
    );
    const objectSid = objectSidResult[0].objectSid + 1;
    await executeQuery("INSERT INTO OBJECT VALUES (?, ?, ?, ?, ?, ?, ?)", [
      objectSid,
      name,
      magazine,
      material,
      unitPrice,
      amount,
      category,
    ]);
    console.log("Added new product");
    res.send("Added new product");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding new product");
  }
};

const addProduct = (req, res) => {
  const id = req.body.ObjectSID;
  const amount = req.body.Amount;
  db.query(
    "UPDATE OBJECT SET Amount = Amount + ? WHERE ObjectSid = ?",
    [amount, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

module.exports = { getProducts, addNewProduct, addProduct };
