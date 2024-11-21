const {ProductCategory} = require('../Models/ProductCategory')

// Create ProductCategory
exports.createProductCategory = async (req, res) => {
    try {
        const { ProductCategory: categoryName, CategoryStatus } = req.body;

        // Check if category already exists
        const existingCategory = await ProductCategory.findOne({ ProductCategory: categoryName });
        if (existingCategory) {
            return res.status(400).json({ message: "Category already exists" });
        }

        // Create new category
        const newCategory = new ProductCategory({
            ProductCategory: categoryName,
            CategoryStatus
        });

        await newCategory.save();
        res.status(201).json({ message: "Category created successfully", newCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
// Get All ProductCategories
exports.getAllCategories = async (req, res) => {
    try {
        const categories = await ProductCategory.find();
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Single ProductCategory by ID
exports.getCategoryById = async (req, res) => {
    try {
        const category = await ProductCategory.findById(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update ProductCategory
exports.updateCategory = async (req, res) => {
    try {
        const { ProductCategory, CategoryStatus } = req.body;

        const updatedCategory = await ProductCategory.findByIdAndUpdate(
            req.params.id,
            { ProductCategory, CategoryStatus },
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete ProductCategory
exports.deleteCategory = async (req, res) => {
    try {
        const category = await ProductCategory.findByIdAndDelete(req.params.id);

        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
