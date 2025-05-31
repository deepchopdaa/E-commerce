const express = require("express");
const { GetProduct, AddProduct, UpdateProduct, DeleteProduct, FilterAplly } = require("../controller/product.controller.js")
const router = express.Router();
const multer = require("../middleware/multer.js")
router.get("/get", GetProduct);
router.get("/getbyfilter", FilterAplly);
router.post("/add", multer.single("image"), AddProduct)
router.put("/update/:id", multer.single("image"), UpdateProduct)
router.delete("/delete/:id", DeleteProduct)

module.exports = router
