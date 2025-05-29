const Cart = require("../model/cart.model.js")

const GetCart = async (req, res) => {
    try {
        console.log("Cart Get Api called !")
        let data = Cart.find()
        if (!data) {
            console.log("Data Not Found")
        }
        res.status(200).send(data)
    } catch (e) {
        console.log("Cart Get Error", e)
        res.status(500).send("Cart Get Error", e)
    }
}

const AddCart = async (req, res) => {
    try {
        console.log("Cart Add Api called !")
        const user = req.user
        const user_id = user._id
        const { product_id, qty } = req.body
        const cart = Cart.findOne({ user_id })
        if (cart) {
            let cartlength = Cart.items.findIndex(item => item.product_id === product_id)
            if (cartlength > -1) {
                cart.items[cartlength].qty = qty
            } else {
                cart.items.push({ product_id, qty })
            }
            await cart.save();
            return res.status(201).send(cart)
        } else {
            let NewCart = Cart.create({ user_id, items: [{ product_id, qty }] })
            return res.status(201).send(NewCart)
        }
    } catch (e) {
        console.log("Cart Add Error", e)
        res.status(500).send("Cart Add Error", e)
    }
}

const UpdateCart = async (req, res) => {
    try {
        console.log("Cart update Api called !")
        const user = req.user
        const user_id = user._id
        const { product_id, qty } = req.body
        const cart = Cart.findOne({ user_id })
        if (cart) {
            let cartlength = Cart.items.findIndex(item => item.product_id === product_id)
            if (cartlength > -1) {
                return res.status(404).json({ message: "Product not found in the cart." })
            }
            cart.items[cartlength].qty = qty
            await cart.save();
            return res.status(201).send(cart)
        } else {
            return res.status(400).send("cart Not Found For this User !")
        }
    } catch (e) {
        console.log("Cart update Error", e)
        res.status(500).send("Cart update Error", e)
    }
}

const DeleteCart = async (req, res) => {
    try {
        console.log("Cart Delete Api called !")
        const user = req.user;
        const user_id = user._id
        const { product_id } = req.body
        const cart = Cart.findOne({user_id})
        if(cart){
            initialvalue=cart.items.length
            cart.items = cart.items.filter(item=>item.product_id.toString() !== product_id);
            if(cart.items.length === initialvalue){
                return res.status(400).send("This product Not Found in Cart !")
            }
            await cart.save();
            return res.status(203).send(cart);
        }else{
            return res.status(400).send("cart Item not Found for this product !")
        }
    } catch (e) {
        console.log("Cart Delete Error", e)
        res.status(500).send("Cart Delete Error", e)
    }
}

module.exports = { GetCart, AddCart, UpdateCart, DeleteCart }