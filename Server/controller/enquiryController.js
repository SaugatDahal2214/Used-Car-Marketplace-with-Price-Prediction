const Enquiry = require('../models/enquiryModel');

// Controller to handle the submission of an enquiry
exports.submitEnquiry = async (req, res) => {
  try {
    // Extract data from the request body
    const { fullName, mobile, email, message } = req.body;

    // Create a new enquiry object
    const enquiry = new Enquiry({
      fullName,
      mobile,
      email,
      message
    });

    // Save the enquiry to the database
    await enquiry.save();

    // Respond with a success message
    res.status(201).json({ message: 'Enquiry submitted successfully' });
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error submitting enquiry:', error);
    res.status(500).json({ error: 'Failed to submit enquiry' });
  }
};

// Controller to retrieve all enquiries
exports.getAllEnquiries = async (req, res) => {
  try {
    // Retrieve all enquiries from the database
    const enquiries = await Enquiry.find();

    // Respond with the list of enquiries
    res.status(200).json(enquiries);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error('Error fetching enquiries:', error);
    res.status(500).json({ error: 'Failed to fetch enquiries' });
  }
};
