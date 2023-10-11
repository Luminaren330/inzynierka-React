const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.post("/makeorder/createorder", ordersController.createOrder);
module.exports = router;
