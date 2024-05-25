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

  const deleteEnquiry = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/enquiries/${id}`);
      setEnquiries(enquiries.filter(enquiry => enquiry._id !== id));
    } catch (error) {
      console.error('Error deleting enquiry:', error);
    }
  };

  const sendEmail = async (enquiry) => {
    try {
      const emailContent = `
Here are the contact details of the person who listed this product. Please feel free to contact:
  
   Name:${enquiry.productName}
    Email:${enquiry.productEmail}
    Number:${enquiry.productNumber}
  
  In case of any emergency, do contact us at info@carrevs.com
`;

      await axios.post('http://localhost:5000/api/send-email', { to: enquiry.email, content: emailContent });
      alert('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send email. Please try again later.');
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Customer Enquiries</h1>
      <div className="row">
        {enquiries.map((enquiry) => (
          <div key={enquiry._id} className="col-lg-4 mb-4">
            <div className="card h-100 shadow">
              <div className="card-body">
                <h5 className="card-title"><strong>Name:</strong> {enquiry.fullName}</h5>
                <p className="card-text"><strong>Email:</strong> {enquiry.email}</p>
                <p className="card-text"><strong>Mobile:</strong> {enquiry.mobile}</p>
                <p className="card-text"><strong>Message:</strong> {enquiry.message}</p>
                <button 
                  className="btn btn-danger mt-3 mr-2" 
                  onClick={() => deleteEnquiry(enquiry._id)}
                >
                  Delete
                </button>
                <button 
                  className="btn btn-primary mt-3 ms-4" 
                  onClick={() => sendEmail(enquiry)}
                >
                  Send Email
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnquiryPage;
