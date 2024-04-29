import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function CreateProduct() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [price, setPrice] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);

  const userData = JSON.parse(localStorage.getItem('user'));
  const token = userData.token;

  useEffect(() => {
    // Fetch brands from the API
    axios.get('http://localhost:5000/api/brand')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });

    // Fetch categories from the API
    axios.get('http://localhost:5000/api/category')
      .then(response => {
        setCategories(response.data);
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
      formData.append('brand', brand);
      formData.append('category', category);
      formData.append('quantity', quantity);
      formData.append('price', price);
      formData.append('tags', tags);
      formData.append('image', image);

      const response = await axios.post('http://localhost:5000/api/product/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.status === 201) {
        setSuccessMessage('Product created successfully!');
        // Clear form fields
        setTitle('');
        setDescription('');
        setBrand('');
        setCategory('');
        setQuantity('');
        setPrice('');
        setTags('');
        setImage('');
        // Refresh the page after 2 seconds
        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } else {
        throw new Error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error.message);
      alert('Failed to create product. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Create Product</h1>
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
          <select className="form-select" value={brand} onChange={(e) => setBrand(e.target.value)} required>
            <option value="">Select Brand</option>
            {brands.map(brand => (
              <option key={brand._id} value={brand.title}>{brand.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category._id} value={category.title}>{category.title}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
        </div>
        <div className="mb-3">
          <select className="form-select" value={tags} onChange={(e) => setTags(e.target.value)} required>
            <option value="">Select Tag</option>
            <option value="feature">Feature</option>
            <option value="recent">Recent</option>
            <option value="most-searched">Most Searched</option>
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
