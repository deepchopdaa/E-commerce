const Wishlist = require("../model/wishlist.model.js");
const WishList = require("../model/wishlist.model.js")

const CreatewishList = async (req, res) => {
    try {
        console.log("wishlist api called !")
        const { product_id } = req.body
        const user = req.user
        const id = user.id
        let widhlist = await WishList.findOne({ id });
        if (widhlist) {
            if (!widhlist.products.includes(product_id)) {
                widhlist.products.push(product_id)
                await widhlist.save()
            }
        } else {
            widhlist = await WishList.create({ user_id, products: [product_id] })
            return res.status(200).send(widhlist)
        }
    } catch (e) {
        console.log("Whishlist Error", e)
        return res.status(500).send("Wishlist Error", e)
    }
}

const GetWishList = async (req, res) => {
    try {
        const user = req.user
        const id = user.id
        console.log("wishlist api called !")
        let data = await WishList.findOne({ id }).populate("products")
        if (!data) {
            console.log("data not found")
        }
        res.status(201).send(data)
    } catch (e) {
        console.log("Whishlist Error", e)
        return res.status(500).send("Wishlist Error", e)
    }
}

const removeProduct = async (req, res) => {
    try {
        console.log("wishlist api called !")
        const { product_id } = req.body
        const user = req.user
        const id = user.id
        let wishlist = await WishList.findOne({ id });
        if (!wishlist) {
            return res.status(404).send("Wishlist not found !")
        }
        let filter = wishlist.products.filter(p => p._id.toString() !== product_id)
        return res.status(201).send(filter)
    } catch (e) {
        console.log("Whishlist Error", e)
        return res.status(500).send("Wishlist Error", e)
    }
}

const DeleteFullWishList = (req, res) => {
    try {
        console.log("wishlist api called !")
        const user = req.user
        const id = user.id
        let DeletedwishList = WishList.findOneAndDelete({ id })
        if (!DeletedwishList) {
            return res.status(404).send("Delete wishlist faild !")
        }
        return res.status(201).send("Deleted successfully !")
    } catch (e) {
        console.log("Whishlist Error", e)
        return res.status(500).send("Wishlist Error", e)
    }
}

module.exports = { CreatewishList, GetWishList, removeProduct, DeleteFullWishList }