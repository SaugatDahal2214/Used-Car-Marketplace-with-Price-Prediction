import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [brands, setBrands] = useState([]);
 
  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData.token;

  useEffect(() => {
    // Fetch brands from the API
    axios.get('http://localhost:5000/api/blogcategory')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category', category);
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/api/blog/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setSuccessMessage('Blog created successfully!');
        // Clear form fields
        setTitle('');
        setDescription('');
        setCategory('');
        setImage('');
        // Refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to create blog');
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
      alert('Failed to create product. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Blog</h1>
      {/* Display success message if available */}
      {successMessage && <p className="alert alert-success">{successMessage}</p>}
      <form>
        {/* Form fields */}
        <div className="mb-3">
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" required />
        </div>
        <div className="mb-3">
          <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" required></textarea>
        </div>
        <div className="mb-3">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {brands.map(category => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input type="file" className="form-control" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Create Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;
