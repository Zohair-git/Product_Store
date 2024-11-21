import React, { useState } from 'react';
import axios from 'axios';

function AddCategory() {
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:7000/category', {
        ProductCategory: category,
        CategoryStatus: status,
      });
      setMessage(response.data.message);
    } catch (error) {
      console.error('Error adding category:', error);
      setMessage('Failed to add category');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Add Category</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Category Name:</label>
          <input 
            type="text" 
            className="form-control" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Status:</label>
          <input 
            type="text" 
            className="form-control" 
            value={status} 
            onChange={(e) => setStatus(e.target.value)} 
            required 
            placeholder="Enter Status (Active/Inactive)"
          />
        </div>
        <button type="submit" className="btn btn-primary">Add Category</button>
      </form>
      {message && <div className="mt-3 alert alert-info">{message}</div>}
    </div>
  );
}

export default AddCategory;
