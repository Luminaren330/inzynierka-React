const db = require("../db");

const getWorkers = (req, res) => {
  db.query(
    "SELECT WorkerId, Name, Surname, PhoneNumber, Position FROM WORKER",
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
};

const addWorker = async (req,res) => {
  const name = req.body.name;
  const surname = req.body.surname;
  const phoneNumber = req.body.phoneNumber;
  const position = req.body.position;

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
    
    const workerIdResult = await executeQuery(
      'SELECT MAX(WORKERID) as workerId FROM WORKER');
    const workerId = workerIdResult[0].workerId + 1;
    const firstLetter = name.charAt(0).toLowerCase();
    const rest = surname.slice(0,5).toLowerCase();
    const login = firstLetter + "-" + rest;
    const password = firstLetter + rest;

    await executeQuery(
      "INSERT INTO WORKERACCOUNT VALUES (?, ?, ?, ?)", [
        login, password, workerId, 'Worker'
      ]
    );

    await executeQuery(
      "INSERT INTO WORKER VALUES (?, ?, ?, ?, ?, ?)", [
        workerId, name, surname, phoneNumber, position, workerId
      ]
    )
    console.log("Added worker");
    res.send("Added worker");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding worker");
  }
}

module.exports = { getWorkers,addWorker };
