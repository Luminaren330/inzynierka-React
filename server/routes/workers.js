const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/workersController");

router.get("/workers", ordersController.getWorkers);
module.exports = router;
