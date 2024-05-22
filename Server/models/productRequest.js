// models/ProductRequest.js
const mongoose = require("mongoose");

const productRequestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    color: {
      type: String,
      required: true,
    },
    engine: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    imageUrl: String,
    tags: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("ProductRequest", productRequestSchema);
