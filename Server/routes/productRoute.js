const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  uploadImage,
  searchProducts,
  getAllProductsStartingWithLetter,
} = require("../controller/productController");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage")
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getaProduct);

router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/upload/:id", authMiddleware, isAdmin, uploadPhoto.array('images', 10), productImgResize, uploadImage)
router.put("/:id", authMiddleware, isAdmin, updateProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);

router.get("/search", searchProducts);

router.get("/", getAllProduct);

module.exports = router;