const { fstat } = require("fs");
const Product = require("../model/product.model.js")
const fs = require("fs")
const GetProduct = async (req, res) => {
    try {
        console.log('Get Prodcut Api Called')
        let data = await Product.find().populate("category", "name");
        console.log(data)
        if (data) {
            console.log("data Is Empty")
            return res.status(400).send("Data Is Empty")
        }
        return res.status(201).send(data)
    } catch (e) {
        console.log("Get product Error", e);
        return res.status(500).send("Get Product Error", e)
    }
}

const AddProduct = async (req, res) => {
    try {
        console.log('Add Prodcut Api Called')
        console.log(req.body);
        let { name, description, price, category, brand, stoke } = req.body;
        if (!name, !description, !price, !category, !brand, !stoke) {
            return res.status(400).send("All Feild Rqquired !")
        }
        if (req.file) {
            return res.status(400).send("Image Not Found !")
        }
        let NewProduct = Product.create({ name, description, price, category, brand, stoke, image: req.file.filename });
        return res.status(500).send(NewProduct);
    } catch (e) {
        console.log("Add product Error", e);
        return res.status(500).send("Add Product Error", e)
    }
}

const UpdateProduct = async (req, res) => {
    try {
        console.log('Update Prodcut Api Called')
        console.log(req.body);
        let id = req.params.id
        let { name, description, price, category, brand, stoke, rating, numReviews, } = req.body;
        if (!name, !description, !price, !category, !brand, !stoke, !rating, !numReviews) {
            return res.status(400).send("All Feild Rqquired !")
        }
        if (req.file) {
            return res.status(400).send("Image Not Found !")
        }

        let productfind = await Product.findById(id)
        if (!productfind) {
            return res.status(403).send('Product Not Found !')
        }
        let existing_image = productfind.image
        fs.unlink(`uploads/${existing_image}`, (err) => {
            if (err) {
                console.log("Delete old file Failed")
            } else {
                console.log("old File Deleted Sucessfully");
            }
        })
        let UpdateProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, brand, stoke, rating, image: req.file.filename })
        return res.status(201).send(UpdateProduct)
    } catch (e) {
        console.log("Update product Error", e);
        return res.status(500).send("Update Product Error", e)
    }
}

const DeleteProduct = async (req, res) => {
    try {
        console.log('Delete Prodcut Api Called')
        let id = req.params.id
        let productfind = await Product.findById(id)
        if (!productfind) {
            return res.status(403).send('Product Not Found !')
        }
        let existing_image = productfind.image
        fs.unlink(`uploads/${existing_image}`, (err) => {
            if (err) {
                console.log("Delete old file Failed")
            } else {
                console.log("old File Deleted Sucessfully");
            }
        })
        let DeleteProduct = await Product.findByIdAndDelete(id);
        return res.status(200).send(DeleteProduct);

    } catch (e) {
        console.log("Delete product Error", e);
        return res.status(500).send("Delete Product Error", e)
    }
}

module.exports = { GetProduct, AddProduct, UpdateProduct, DeleteProduct }