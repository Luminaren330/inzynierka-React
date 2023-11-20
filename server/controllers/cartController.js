const db = require("../db");

const getCart = (req, res) => {
  const select =
    "SELECT ITEMS.OBJECT_OBJECTSID, ITEMS.CargoId, OBJECT.Name as ObjectName, ITEMS.Amount, ITEMS.Price FROM ITEMS";

  const join =
    " INNER JOIN OBJECT ON ITEMS.Object_ObjectSID = OBJECT.ObjectSID WHERE ITEMS.Status =0";

  const sql = select + join;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const addCart = async (req, res) => {
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
      "SELECT MAX(ORDERNUMBER) as orderCount FROM `ORDER`"
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
    res.json({text: "Dodano do koszyka"});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding to Cart");
  }
};

const deleteCart = async (req, res) => {
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
    res.json({text: "Usunięto z koszyka"});
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting from cart");
  }
};

module.exports = {
  getCart,
  addCart,
  deleteCart,
};
