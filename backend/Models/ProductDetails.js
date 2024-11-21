const mongoose = require("mongoose");

const ProductDetails_Model = mongoose.Schema(
    {
        ProductName: {
            type: String,
            required: [true, "Product must be there"]
        },

        Category: {
            type: mongoose.Schema.ObjectId,
            ref:'ProductCategory',
            required: [true, "Category must be valid"],
        },
        ProductDescription:{
            type: String,
            required:[true,"Description must be added"]
        },
        ProductPrice:{
            type:Number,
            required:[true,"Price should be valid"]
        }

    
    }
);

const ProductDetails = mongoose.model("ProductDetails", ProductDetails_Model);

module.exports = {ProductDetails}