const express = require('express');

const cors = require('cors'); // Import CORS package
const App = express();
require('dotenv').config();

App.use(express.json());
App.use(express.urlencoded({extended:true}))
App.use(cors({
    origin: 'http://localhost:3000', // Allow requests only from localhost:3000 (adjust if needed)
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // You can allow other headers if needed
}));


// Connection with Atlas
const {DbConnnection} = require('./Database/Db')

// requiring product function from controller

const {
    createProductDetails,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("./Controller/ProductController");

// requiring category function from controller

const {
    createProductCategory,
    getAllCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("./Controller/CategoryController");

// Category Routes

App.route("/category")
    .get(getAllCategories)  // Get all category
    .post(createProductCategory);  // Create a new category

App.route("/category/:id")
    .get(getCategoryById)  // Get category by ID
    .put(updateCategory)  // Update category by ID
    .delete(deleteCategory);  // Delete category by ID



// Product Routes
App.route("/products")
    .get(getAllProducts)  // Get all products
    .post(createProductDetails);  // Create a new product

App.route("/products/:id")
    .get(getProductById)  // Get product by ID
    .put(updateProduct)  // Update product by ID
    .delete(deleteProduct);  // Delete product by ID

App.listen(process.env.PORT,function(){
    console.log(`Server is running on port ${process.env.PORT}`)
    DbConnnection(); 
})