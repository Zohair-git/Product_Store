import React, { useState, useEffect } from 'react';
import axios from 'axios';

function AddProduct() {
  const [productName, setProductName] = useState('');
  const [category, setCategory] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch categories when the component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:7000/category'); // Adjust the endpoint if necessary
        setCategories(response.data); // Set the categories from the response
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs once on component mount

  // Handle form submission (post product data)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/products', {
        ProductName: productName,
        Category: category, // Send selected category ID
        ProductDescription: productDescription,
        ProductPrice: productPrice,
      });
      setMessage(response.data.message); // Show success message
    } catch (error) {
      console.error('Error adding product:', error);
      setMessage('Failed to add product');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Product Name:</label>
          <input
            type="text"
            className="form-control"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-3">
          <label className="form-label">Category:</label>
          <select
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)} // Set selected category ID
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.ProductCategory} {/* Display the name of the category */}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Product Description:</label>
          <textarea
            className="form-control"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Product Price:</label>
          <input
            type="number"
            className="form-control"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>

      {/* Show message or error */}
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default AddProduct;
