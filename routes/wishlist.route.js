const { CreatewishList, GetWishList, removeProduct, DeleteFullWishList } = require("../controller/wishlist.conroller.js")
const express = require("express")
const route = express.Router();

route.get("/get", GetWishList)
route.post("/add", CreatewishList)
route.delete("/remove", removeProduct)
route.delete("/delete", DeleteFullWishList)

module.exports = route