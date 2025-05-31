const express = require("express");
const isAdmin = require("../middleware/Admin.middleare.js")
const { GetProduct, AddProduct, UpdateProduct, DeleteProduct, FilterAplly, GetProductAdmin } = require("../controller/product.controller.js")
const router = express.Router();
const multer = require("../middleware/multer.js")
router.get("/get", GetProduct);
router.get("/getadmin", isAdmin, GetProductAdmin);
router.get("/getbyfilter", FilterAplly);
router.post("/add",  multer.array("image"), AddProduct)
router.put("/update/:id", multer.array("image",10), UpdateProduct)
router.delete("/delete/:id", DeleteProduct)

module.exports = router
