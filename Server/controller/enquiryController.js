const Enquiry = require('../models/enquiryModel'); // Import the Enquiry model if you're using Mongoose or any other ORM/ODM

exports.submitEnquiry = async (req, res) => {
  try {
    const { fullName, mobile, email, message, productId, productTitle, productName, productEmail, productNumber } = req.body;

    // Validation logic
    if (!fullName || !mobile || !email || !message || !productId || !productTitle || !productName || !productEmail || !productNumber) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Assuming Enquiry is your Mongoose model for storing enquiries
    const enquiry = new Enquiry({
      fullName,
      mobile,
      email,
      message,
      productId,
      productTitle,
      productName,
      productEmail,
      productNumber
    });

    // Save the enquiry to the database
    await enquiry.save();

    // Respond with success message
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
};



// Controller to retrieve all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find();
    res.status(200).json(enquiries);
  } catch (error) {
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};

// Controller to delete an enquiry
exports.deleteEnquiry = async (req, res) => {
  try {
    const { id } = req.params;
    await Enquiry.findByIdAndDelete(id);
    res.status(200).json({ message: 'Enquiry deleted successfully' });
  } catch (error) {
    console.error('Error deleting enquiry:', error);
    res.status(500).json({ error: 'Failed to delete enquiry' });
  }
};
