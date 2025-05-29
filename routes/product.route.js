const express = require("express");
const { GetProduct, AddProduct, UpdateProduct, DeleteProduct } = require("../controller/product.controller.js")
const router = express.Router();

router.get("/get", GetProduct);
router.post("/add", AddProduct)
router.put("/update/:id", UpdateProduct)
router.delete("/delete/:id", DeleteProduct)

module.exports = router
