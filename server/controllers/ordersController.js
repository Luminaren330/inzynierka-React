const db = require("../db");

const createOrder = async (req, res) => {
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
};

const getOrders = (req, res) => {
  const selectClient =
    "SELECT `ORDER`.OrderId as orderId, CLIENT.NAME as client, CLIENT.ADDRESS as address, CLIENT.Zipcode as zipcode, CLIENT.PhoneNumber as phoneNumber, ";
  const selectItems =
    "GROUP_CONCAT(CONCAT(ITEMS.Amount, ' ', OBJECT.NAME) SEPARATOR ', ') as items, ";
  const selectWorker = "WORKER.Name as worker1, WORKER.Surname as worker2 ";

  const objectJoin =
    "FROM ((((ITEMS INNER JOIN OBJECT ON ITEMS.Object_ObjectSID = OBJECT.ObjectSID) ";

  const orderJoin = "INNER JOIN `Order` ON ITEMS.OrderId = `Order`.OrderId) ";

  const clientJoin =
    "INNER JOIN CLIENT ON CLIENT.ClientId = `Order`.Client_ClientId) ";

  const workerJoin =
    "INNER JOIN WORKER ON WORKER.WorkerId = `Order`.Worker_WorkerId) ";

  const whereClause = "WHERE `ORDER`.OrderStatus = 0 GROUP BY `ORDER`.OrderId";

  const sql =
    selectClient +
    selectItems +
    selectWorker +
    objectJoin +
    orderJoin +
    clientJoin +
    workerJoin +
    whereClause;

  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

const deleteOrder = async (req, res) => {
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
    await executeQuery("DELETE FROM ITEMS WHERE OrderId = ?", [id]);

    await executeQuery("DELETE FROM `ORDER` WHERE OrderId = ?", [id]);

    await executeQuery("DELETE FROM CLIENT WHERE ClientId = ?", [id]);

    console.log("Order ended");
    res.send("Order ended");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting order");
  }
};

module.exports = {
  createOrder,
  getOrders,
  deleteOrder,
};
