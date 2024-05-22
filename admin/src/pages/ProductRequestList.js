import React, { useEffect, useState } from 'react';

const ProductRequestList = () => {
  const [productRequests, setProductRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedTags, setSelectedTags] = useState({});
  const [selectedCategories, setSelectedCategories] = useState({});
  const [deleteRequestId, setDeleteRequestId] = useState(null);

  const imageUrl = 'http://localhost:5000/';

  useEffect(() => {
    const fetchProductRequests = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/product-requests');
        if (!response.ok) {
          throw new Error('Failed to fetch product requests');
        }
        const data = await response.json();
        setProductRequests(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/category');
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProductRequests();
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/product-requests/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error('Failed to delete product request');
      }
      setProductRequests(productRequests.filter((request) => request._id !== id));
      setDeleteRequestId(null); // Close the modal
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddProduct = async (request) => {
    try {
      const selectedTag = selectedTags[request._id] || '';
      const selectedCategory = selectedCategories[request._id] || '';
      const productData = { ...request, tags: selectedTag, category: selectedCategory };

      const response = await fetch('http://localhost:5000/api/product/add-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        throw new Error('Failed to add product');
      }

      const data = await response.json();
      console.log("Product added successfully", data);
      alert('Product added successfully!');

      // Remove the product request from the list
      setProductRequests(productRequests.filter((r) => r._id !== request._id));

      // Delete the product request from the backend
      await handleDelete(request._id);
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product');
    }
  };

  const handleTagChange = (requestId, tag) => {
    setSelectedTags({
      ...selectedTags,
      [requestId]: tag,
    });
  };

  const handleCategoryChange = (requestId, category) => {
    setSelectedCategories({
      ...selectedCategories,
      [requestId]: category,
    });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <h1 className="my-4">Product Requests</h1>
      <table className="table table-hover table-bordered">
        <thead className="thead-dark">
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Price</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Quantity</th>
            <th>Color</th>
            <th>Engine</th>
            <th>Year</th>
            <th>Image</th>
            <th>Tags</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {productRequests.map((request) => (
            <tr key={request._id}>
              <td>{request.title}</td>
              <td>{request.description}</td>
              <td>{request.price}</td>
              <td>
                <select
                  className="form-select category-select"
                  value={selectedCategories[request._id] || request.category || ''}
                  onChange={(e) => handleCategoryChange(request._id, e.target.value)}
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category.title}>
                      {category.title}
                    </option>
                  ))}
                </select>
              </td>
              <td>{request.brand}</td>
              <td>{request.quantity}</td>
              <td>{request.color}</td>
              <td>{request.engine}</td>
              <td>{request.year}</td>
              <td>
                <img src={imageUrl + request.imageUrl} alt={request.title} style={{ width: '100px', height: 'auto' }} />
              </td>
              <td>
                <select
                  className="form-select tag-select"
                  value={selectedTags[request._id] || ''}
                  onChange={(e) => handleTagChange(request._id, e.target.value)}
                >
                  <option value="">Select Tag</option>
                  <option value="Feature">Feature</option>
                  <option value="Recent">Recent</option>
                  <option value="Most Searched">Most Searched</option>
                </select>
              </td>
              <td className="btn-container">
                <button
                  className="btn btn-primary me-3 mb-3"
                  onClick={() => handleAddProduct(request)}
                >
                  Add Product
                </button>
                <button
                  className="btn btn-danger"
                  onClick={() => setDeleteRequestId(request._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {deleteRequestId && (
        <div className="modal fade show" style={{ display: 'block' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="close" onClick={() => setDeleteRequestId(null)}>
                  &times;
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this product request?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setDeleteRequestId(null)}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={() => handleDelete(deleteRequestId)}>
                  Delete
                </button>
                </div>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default ProductRequestList;