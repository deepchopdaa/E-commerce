const Order = require("../model/order.model.js")
const Product = require("../model/product.model.js")
const OrderGet = async (req, res) => {
    try {
        console.log("Get Oredr Api Called !")
        let Orders = await Order.find().populate("user", "name");
        if (!Orders) {
            console.log("Order Is Empty")
        }
        return res.status(201).send(Orders)
    } catch (e) {
        console.log("Get Order Api called !")
        return res.status(500).send("Get order Api Error", e)
    }
}
const OrderAdd = async (req, res) => {
    try {
        console.log("Add Oredr Api Called !")
        console.log(req.body);
        let { user, orderItems, shippingAddress, paymentMethod, paymentResult, } = req.body;
        if (!user, !orderItems, !shippingAddress, !paymentMethod, !paymentResult) {
            return res.status(400).send("All feild requried !")
        }
        for (const item of orderItems) {
            const product = await Product.findById(item.Product)
            if (!product) {
                return res.status(400).send("Product Not Found !");
            }
            if (product.stoke < item.qty) {
                return res.status(400).send(`${product.name} is Out Of Stoke !`)
            }
        }
        for (const item of orderItems) {
            await Product.findByIdAndUpdate(item.Product, {
                $inc: {
                    stoke: -item.qty
                }
            })
        }
        const itemsPrice = orderItems.reduce((acc, item) => acc + item.qty * item.price, 0)
        const tax = Number((itemsPrice * 0.1)).toFixed(2);
        const Sprice = itemsPrice > 100 ? 0 : 10;
        const Tprice = Number((itemsPrice + tax + Sprice)).toFixed(2)

        let NewOrder = await Order.create({ user: req.user._id, orderItems, shippingAddress, paymentMethod, paymentResult, taxPrice: tax, shippingPrice: Sprice, totalPrice: Tprice })
        return res.status(201).send(NewOrder)
    } catch (e) {
        console.log("Add Order Api called !")
        return res.status(500).send("Add order Api Error", e)
    }
}
const OrderUpdate = async (req, res) => {
    try {
        console.log("Update Oredr Api Called !")
        const id = req.params.id;
        const order = await Order.findById(id);
        if (order) {
            order.isDelivered = true,
                order.deliveredAt = Date.now();
        }
        const updateOrder = await Order.save();
        res.status(201).send(updateOrder);
    } catch (e) {
        console.log("Update Order Api called !")
        return res.status(500).send("Update order Api Error", e)
    }
}
const OrderDelete = async (req, res) => {
    try {
        console.log("Delete Oredr Api Called !")
        const orderdelete = await Order.findByIdAndDelete(id);
        console.log(orderdelete)
        res.status(205).send(orderdelete)
    } catch (e) {
        console.log("Delete Order Api called !")
        return res.status(500).send("Delete order Api Error", e)
    }
}

const OrderStatusUpdate = async (req, res) => {
    try {
        console.log("Order Status Updated")
        const id = req.params.id
        const { status } = req.body
        let findOrder = await Order.findById(id);
        if (!findOrder) {
            return res.status(404).send("Order Not Found !")
        }
        if (findOrder.status === "Pendding") {
            if (findOrder.isPaid == true) {
                findOrder.status = "Confirm"
                if (findOrder.isDelivered == true) {
                    findOrder.status = "Delivered"
                }
            }
        } else {
            findOrder.status = status
        }

        await findOrder.save();
        return res.status(200).send("order status updated !")
    } catch (e) {
        console.log("Order Status Update Error", e)
        return res.status(500).send("order Status Update Error", e)
    }
}
module.exports = { OrderGet, OrderAdd, OrderUpdate, OrderDelete, OrderStatusUpdate }