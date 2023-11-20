const express = require("express");
const router = express.Router();
const productsController = require("../controllers/productsController");

router.get("/products", productsController.getProducts);
router.post("/products/addnewproduct", productsController.addNewProduct);
router.put("/products/addproduct", productsController.addProduct);
module.exports = router;
