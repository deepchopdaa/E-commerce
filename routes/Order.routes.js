const express = require("express");
const { OrderGet, OrderAdd, OrderUpdate, OrderDelete , OrderStatusUpdate } = require("../controller/order.controller.js")
const router = express.Router();

router.get("/get", OrderGet);
router.post("/add", OrderAdd);
router.put("/update/:id", OrderUpdate);
router.put("/updatestatus/:id", OrderStatusUpdate);
router.delete("/delete/:id", OrderDelete);
module.exports = router