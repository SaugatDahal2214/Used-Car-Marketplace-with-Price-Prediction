const express = require('express');
const router = express.Router();
const enquiryController = require('../controller/enquiryController');

router.post('/enquiries', enquiryController.submitEnquiry);
router.get('/enquiries', enquiryController.getAllEnquiries);
router.delete('/enquiries/:id', enquiryController.deleteEnquiry); // Add this line

module.exports = router;
