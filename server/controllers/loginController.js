const db = require("../db");

const getCredentials = (req, res) => {
  db.query("SELECT Login, Password FROM WORKERACCOUNT", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};
module.exports = { getCredentials };
