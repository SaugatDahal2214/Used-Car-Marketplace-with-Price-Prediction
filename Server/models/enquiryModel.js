const mongoose = require('mongoose');

// Define the schema for the Enquiry model
const enquirySchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create the Enquiry model using the schema
const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
