const { ProductCategory } = require("../Models/ProductCategory");
const {ProductDetails} = require("../Models/ProductDetails");

// Create ProductDetails
exports.createProductDetails = async (req, res) => {
    try {
        const { ProductName, Category, ProductDescription, ProductPrice } = req.body;

        // Check if Category exists
        const category = await ProductCategory.findById(Category);
        if (!category) {
            return res.status(400).json({ message: "Invalid Category" });
        }

        const newProduct = new ProductDetails({
            ProductName,
            Category,
            ProductDescription,
            ProductPrice,
        });

        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get All ProductDetails
exports.getAllProducts = async (req, res) => {
    try {
        const products = await ProductDetails.find().populate("Category");
        res.status(200).json(products);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Get Single ProductDetail by ID
exports.getProductById = async (req, res) => {
    try {
        const product = await ProductDetails.findById(req.params.id).populate("Category");

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Update ProductDetails
exports.updateProduct = async (req, res) => {
    try {
        const { ProductName, Category, ProductDescription, ProductPrice } = req.body;

        // Check if Category exists
        const category = await ProductCategory.findById(Category);
        if (!category) {
            return res.status(400).json({ message: "Invalid Category" });
        }

        const updatedProduct = await ProductDetails.findByIdAndUpdate(
            req.params.id,
            {
                ProductName,
                Category,
                ProductDescription,
                ProductPrice,
            },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product updated successfully", updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

// Delete ProductDetails
exports.deleteProduct = async (req, res) => {
    try {
        const product = await ProductDetails.findByIdAndDelete(req.params.id);

        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
