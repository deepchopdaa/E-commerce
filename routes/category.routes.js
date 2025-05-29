const express = require("express");
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require("../controller/category.controller.js");

const router = express.Router();

router.post("/add", createCategory);           // Create category
router.get("/get", getAllCategories);          // Get all categories
router.put("/update/:id", updateCategory);         // Update category
router.delete("/delete/:id", deleteCategory);      // Delete category

module.exports = router;
