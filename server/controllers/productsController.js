const db = require("../db");

exports.getProducts = (req, res) => {
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
