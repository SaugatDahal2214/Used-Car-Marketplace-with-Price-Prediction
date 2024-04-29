import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EnquiryPage = () => {
  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const fetchEnquiries = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/enquiries');
      setEnquiries(response.data);
    } catch (error) {
      console.error('Error fetching enquiries:', error);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Customer Enquiries</h1>
      <div className="row">
        {enquiries.map((enquiry, index) => (
          <div key={index} className="col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title"><strong>Name:</strong>{enquiry.fullName}</h5>
                <p className="card-text"><strong>Email:</strong> {enquiry.email}</p>
                <p className="card-text"><strong>Mobile:</strong> {enquiry.mobile}</p>
                <p className="card-text"><strong>Message:</strong> {enquiry.message}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnquiryPage;
