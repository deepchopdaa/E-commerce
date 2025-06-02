const express = require("express");
const { GetCart,AddCart,UpdateCart,DeleteCart} = require("../controller/Cart.controller.js")
const router = express.Router();

router.get("/get", GetCart);
router.post("/add", AddCart);
router.put("/update/:id", UpdateCart);
router.delete("/delete/:id", DeleteCart);
module.exports = router