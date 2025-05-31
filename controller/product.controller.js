const Product = require("../model/product.model.js")
const fs = require("fs")
const path = require("path")
const GetProduct = async (req, res) => {
    try {
        console.log('Get Prodcut Api Called')
        let data = await Product.find().populate("category", "name");
        console.log(data)
        if (!data) {
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
        if (!req.file) {
            return res.status(400).send("Image Not Found !")
        }
        console.log(req.file)
        let filename = req.file.filename
        console.log(filename)
        let NewProduct = await Product.create({ name, description, price, category, brand, stoke, image: req.file.path });
        console.log(NewProduct)
        return res.status(200).send(NewProduct);
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
        let { name, description, price, category, brand, stoke } = req.body;
        if (!name, !description, !price, !category, !brand, !stoke) {
            return res.status(400).send("All Feild Rqquired !")
        }
        if (!req.file) {
            return res.status(400).send("Image Not Found !")
        }

        let productfind = await Product.findById(id)
        if (!productfind) {
            return res.status(403).send('Product Not Found !')
        }
        let existing_image = productfind.image
        console.log(existing_image)
        fs.unlinkSync(existing_image, (err) => {
            if (err) {
                console.log("Delete old file Failed")
            } else {
                console.log("old File Deleted Sucessfully");
            }
        })
        console.log(req.file.path)
        let UpdateProduct = await Product.findByIdAndUpdate(id, { name, description, price, category, brand, stoke, image: req.file.path }, { new: true })
        console.log(UpdateProduct)
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
        console.log(existing_image)
        fs.unlinkSync(existing_image, (err) => {
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

/* user Api */

const SerchProduct = async (req, res) => {
    try {
        console.log("Search api called !");
        const { KeyWord } = req.query
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit;
        const query = KeyWord ? {
            $or: [
                { name: { $regex: KeyWord, $options: "i" } },
                { category: { $regex: KeyWord, $options: "i" } },
                { description: { $regex: KeyWord, $options: "i" } },
            ],
        } : {};
        const products = await Product.find(query).skip(skip).limit(limit);
        return res.status(200).send(products);
    } catch (e) {
        console.log('Search Api Error ', e);
        return res.status(500).send("Serch Api Error !", e);
    }
}

const ListAllProduct = async (req, res) => {
    try {
        console.log("Pagination Get Api Called !")
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit;
        let data = Product.find().skip(skip).limit(limit)
        console.log(data, "List All product !");
        return res.status(201).send(data);
    } catch (e) {
        console.log("List Product Error", e);
        return res.status(500).send("List Product Error", e);
    }
}

const ListByCategory = async (req, res) => {
    try {
        console.log("List Categiry By Api Called !");
        let id = req.params.id;
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit;
        const Bycategory = Product.find(id).skip(skip).limit(limit)
        console.log(Bycategory);
        return res.status(201).send(Bycategory);
    } catch (e) {
        console.log("List By Category Error", e);
        return res.status(500).send("List By Category Error", e);
    }
}

const FilterAplly = async (req, res) => {
    try {
        console.log("Filter Data API called!");

        const {
            Keyword,
            maxPrize,
            minPrize,
            brand,
            category,
            page = 1,
            limit = 10
        } = req.query;

        const query = {};

        const skip = (page - 1) * limit;

        // Keyword search
        if (Keyword) {
            query.$or = [
                { name: { $regex: Keyword, $options: "i" } },
                { description: { $regex: Keyword, $options: "i" } }
            ];
        }

        // Price filter
        if (minPrize || maxPrize) {
            query.price = {};
            if (minPrize) query.price.$gte = Number(minPrize);
            if (maxPrize) query.price.$lte = Number(maxPrize);
        }

        // Brand filter
        if (brand) {
            query.brand = { $regex: brand, $options: "i" };
        }

        // Category filter
        if (category) {
            query.category = { $regex: category, $options: "i" };
        }

        // Fetch data with pagination
        const data = await Product.find(query).skip(skip).limit(Number(limit));
        const count = await Product.countDocuments(query);

        console.log(count, "Total matching products");

        return res.status(200).send({
            success: true,
            total: count,
            page: Number(page),
            limit: Number(limit),
            data,
        });
    } catch (e) {
        console.error("Filtering Data Error", e);
        return res.status(500).send("Filtering Data Error");
    }

}

module.exports = { GetProduct, AddProduct, UpdateProduct, DeleteProduct, SerchProduct, ListAllProduct, ListByCategory, FilterAplly }