const mongoose = require("mongoose");

const ProductCategorySchema = mongoose.Schema(
    {
        ProductCategory: {
            type: String,
            unique: true,
            required: [true, "Category must be added"]
        },
        CategoryStatus: {
            type: String,
            required: [true, "Status should be Active or Inactive"],
        },
    }
);

const ProductCategory = mongoose.model("ProductCategory", ProductCategorySchema);

module.exports = { ProductCategory };
