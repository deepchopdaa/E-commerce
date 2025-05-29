const Category = require("../model/category.model.js");

const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        // Check if category already exists
        const existing = await Category.findOne({ name: name.trim() });
        if (existing) {
            return res.status(400).json({ message: "Category already exists" });
        }
        const category = await Category.create({ name: name.trim() });
        return res.status(201).json(category);
    } catch (err) {
        console.error("Create Category Error", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find().sort({ name: 1 });
        return res.status(200).json(categories);
    } catch (err) {
        console.error("Get Categories Error", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const updated = await Category.findByIdAndUpdate(
            id,
            { name: name.trim() },
            { new: true }
        );
        if (!updated) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json(updated);
    } catch (err) {
        console.error("Update Category Error", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Category.findByIdAndDelete(id);
        if (!deleted) {
            return res.status(404).json({ message: "Category not found" });
        }
        return res.status(200).json({ message: "Category deleted successfully" });
    } catch (err) {
        console.error("Delete Category Error", err);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
};
