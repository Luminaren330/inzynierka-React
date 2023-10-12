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

module.exports = { getWorkers };
