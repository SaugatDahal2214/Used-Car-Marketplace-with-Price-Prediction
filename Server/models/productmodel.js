const mongoose = require("mongoose"); 

var productSchema  = new mongoose.Schema(
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
    name: {
      type: String,
      required: true,
    },
    number: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
    },
    kmsDriven: String,
    transmissionType: String,
    engineType: String
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);