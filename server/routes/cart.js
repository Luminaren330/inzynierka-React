const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.get("/products/cart", cartController.getCart);
router.post("/products/cartadd", cartController.addCart);
router.delete("/products/deletecart/:id", cartController.deleteCart);

module.exports = router;
