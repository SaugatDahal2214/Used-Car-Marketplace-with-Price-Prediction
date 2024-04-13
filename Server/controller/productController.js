const Product = require("../models/productmodel");
const User = require("../models/usermodel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbld");
const { cloudinaryUploadImg } = require("../utils/cloudinary.js");
const fs = require("fs");

const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id; // Extract the ID from req.params
    validateMongoDbId(id);
    try {
      if (req.body.title) {
        req.body.slug = slugify(req.body.title);
      }
      const updatedProduct = await Product.findOneAndUpdate(
        { _id: id }, // Use _id to match documents
        req.body,
        { new: true }
      );
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(updatedProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  

  const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id; // Extract the ID from req.params
    validateMongoDbId(id);
    try {
      const deletedProduct = await Product.findOneAndDelete({ _id: id }); // Use _id to match documents
      if (!deletedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
      res.json(deletedProduct);
    } catch (error) {
      throw new Error(error);
    }
  });
  

const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    // Sorting

    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    // pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});


const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});


const uploadImage = asyncHandler(async(req,res)=>{
  const { id }  = req.params
  validateMongoDbId(id);
  try{
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = []
    const files = req.files
    for(const file of files){
      const { path } = file; // Corrected from `files` to `file`
      const newpath = await uploader(path) 
      urls.push(newpath)
      fs.unlinkSync(path)
    }

    const findProduct = await Product.findByIdAndUpdate(id, { // Corrected from `product` to `Product`
      images: urls.map((file)=>{ return file })
    },{
      new: true
    })

    res.json(findProduct)
  }catch (error){
    throw new Error(error)
  }
})

const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; // Get the partial query string from the request query parameters
    const regex = new RegExp(query, "i"); // Create a case-insensitive regex pattern for matching the partial query string
    
    // Find products that match the partial query string
    const suggestions = await Product.find({ title: regex }).limit(10); // Limit the number of suggestions to 10
    
    res.json(suggestions); // Return the suggestions as JSON response
  } catch (error) {
    console.error("Error fetching search suggestions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProductsStartingWithLetter = async (req, res) => {
  try {
    const { letter } = req.query;
    const products = await Product.find({ title: { $regex: `^${letter}`, $options: 'i' } });
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  uploadImage,
  searchProducts,
  getAllProductsStartingWithLetter
//   rating,
};