const express = require("express");
const multer = require("multer");
const router = express.Router();
const ProductRequest = require("../models/productRequest");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Ensure the uploads directory exists
const fs = require('fs');
const path = require('path');
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Route to add a new product request
router.post('/add', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price, category, brand, quantity, color, engine, year, tags, name, number, email, kmsDriven, transmissionType, engineType } = req.body;

    if (!title || !description || !price || !brand || !quantity || !color || !engine || !year || !name || !number || !email || !kmsDriven || !transmissionType || !engineType) {
      return res.status(400).json({ message: "All required fields must be provided" });
    }

    const requestData = {
      title,
      description,
      price,
      category,
      brand,
      quantity,
      color,
      engine,
      year,
      tags,
      name,
      number,
      email,
      kmsDriven,
      transmissionType,
      engineType
    };

    if (req.file) {
      requestData.imageUrl = req.file.path;
    }

    const newProductRequest = new ProductRequest(requestData);
    await newProductRequest.save();
    
    res.status(201).json({ message: "Product request added successfully", productRequest: newProductRequest });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// Route to get all product requests
router.get("/", async (req, res) => {
  try {
    const productRequests = await ProductRequest.find();
    res.status(200).json(productRequests);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await ProductRequest.findByIdAndDelete(id);
    res.status(200).json({ message: 'Product request deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
