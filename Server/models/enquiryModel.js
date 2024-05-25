const mongoose = require('mongoose');

const enquirySchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    productTitle: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    productEmail: {
        type: String,
        required: true
    },
    productNumber: {
        type: String,
        required: true
    },
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

const Enquiry = mongoose.model('Enquiry', enquirySchema);

module.exports = Enquiry;
