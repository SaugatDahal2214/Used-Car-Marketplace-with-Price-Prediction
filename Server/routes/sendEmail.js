// routes/sendEmail.js

const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  try {
    const { to, content } = req.body;

    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com', // Your SMTP host
      port: 587, // Your SMTP port
      secure: false, // True for 465, false for other ports
      auth: {
        user: "trekkingtrales@gmail.com",
        pass: "shnj ekoi arjo bwkl",
      }
    });

    // Send mail with defined transport object
    let info = await transporter.sendMail({
      from: '"Used Cars" <trekkingtrales@gmail.com>', // Sender address
      to: to, // List of recipients
      subject: 'Enquiry Details', // Subject line
      text: content // Plain text body
    });

    console.log('Message sent: %s', info.messageId);
    res.status(200).json({ message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;
