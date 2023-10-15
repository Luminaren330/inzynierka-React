const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.route("/products").get(productsController.getProducts);
router.post("/products/addnewproduct", productsController.addNewProduct)
module.exports = router;
