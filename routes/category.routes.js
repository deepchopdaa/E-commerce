const express = require("express");
const protect = require("../middleware/protected.middleware.js")
const {
    createCategory,
    getAllCategories,
    updateCategory,
    deleteCategory,
} = require("../controller/category.controller.js");
const multer = require("../middleware/multer.js")

const router = express.Router();

router.post("/add", protect, multer.single("image"), createCategory);   // Create category
router.get("/get", getAllCategories);          // Get all categories
router.put("/update/:id", multer.single("image"), updateCategory);  // Update categorys
router.delete("/delete/:id", deleteCategory);      // Delete category

module.exports = router;
