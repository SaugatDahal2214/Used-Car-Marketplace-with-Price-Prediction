import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { base_url } from '../utils/baseUrl';

const AddProductForm = () => {
  const [productData, setProductData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    quantity: '',
    tags: '',
    image: null, // For storing the selected image file
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  useEffect(() => {
    // Fetch brands
    axios.get('http://localhost:5000/api/brand')
      .then(response => {
        setBrands(response.data);
      })
      .catch(error => {
        console.error('Error fetching brands:', error);
      });

    // Fetch categories
    axios.get('http://localhost:5000/api/category')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setProductData({ ...productData, category });
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setProductData({ ...productData, brand });
  };

  const handleTagChange = (tag) => {
    setSelectedTag(tag);
    setProductData({ ...productData, tags: tag });
  };

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      // Handle image file separately
      setProductData({ ...productData, image: e.target.files[0] });
    } else {
      const { name, value } = e.target;
      setProductData({ ...productData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', productData.title);
      formData.append('description', productData.description);
      formData.append('price', productData.price);
      formData.append('category', productData.category);
      formData.append('brand', productData.brand);
      formData.append('quantity', productData.quantity);
      formData.append('tags', productData.tags);
      formData.append('image', productData.image);
      //  Assuming 'image' is the name of the file input
      
      // Send POST request to create a new product
      const response = await axios.post(`${base_url}product/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log(response)
      console.log('Product added:', response.data);
      // Optionally, perform additional actions after successful submission
    } catch (error) {
      console.error('Error adding product:', error);
      // Optionally, handle error scenarios
    }
  };
  

  return (
    <div className="container">
      <div className="mb-3">
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter title"
          name="title"
          value={productData.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Description:</label>
        <textarea
          className="form-control"
          rows={3}
          placeholder="Enter description"
          name="description"
          value={productData.description}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Price:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter price"
          name="price"
          value={productData.price}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
  <label className="form-label">Category:</label>
  <select className="form-select" onChange={(e) => handleCategoryChange(e.target.value)} value={selectedCategory}>
    <option value="">Select Category</option>
    {categories.map(category => (
      <option key={category._id} value={category.title}>{category.title}</option>
    ))}
  </select>
</div>
<div className="mb-3">
  <label className="form-label">Brand:</label>
  <select className="form-select" onChange={(e) => handleBrandChange(e.target.value)} value={selectedBrand}>
    <option value="">Select Brand</option>
    {brands.map(brand => (
      <option key={brand._id} value={brand.title}>{brand.title}</option>
    ))}
  </select>
</div>

      <div className="mb-3">
        <label className="form-label">Quantity:</label>
        <input
          type="number"
          className="form-control"
          placeholder="Enter quantity"
          name="quantity"
          value={productData.quantity}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags:</label>
        <select className="form-select" onChange={(e) => handleTagChange(e.target.value)} value={selectedTag}>
          <option value="">Select Tags</option>
          <option value="Feature">Feature</option>
          <option value="Best Selling">Best Selling</option>
          <option value="Most searched">Most searched</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Image:</label>
        <input
          type="file"
          className="form-control"
          accept="image/*"
          onChange={handleChange}
          name="image"
          required
        />
      </div>
      <Button variant="primary" onClick={handleSubmit}>Add Product</Button>
    </div>
  );
};

export default AddProductForm;
