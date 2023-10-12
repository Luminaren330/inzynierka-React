const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");

router.post("/makeorder/createorder", ordersController.createOrder);
router.get("/orders", ordersController.getOrders);
router.delete("/orders/:id", ordersController.deleteOrder);
module.exports = router;
