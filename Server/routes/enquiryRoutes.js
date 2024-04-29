const express = require('express');
const router = express.Router();
const enquiryController = require('../controller/enquiryController');

// Route to submit an enquiry
router.post('/enquiries', enquiryController.submitEnquiry);

// Route to fetch all enquiries
router.get('/enquiries', enquiryController.getAllEnquiries);

module.exports = router;
