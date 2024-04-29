const express = require("express");
const {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  getSuggestions,
  uploadImage,
  searchProducts,
} = require("../controller/productController");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImage")
const router = express.Router();

const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads'); // Upload images to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Use the original file name for the uploaded image
  },
});

const upload = multer({ storage });


router.post("/",  upload.single('image'), createProduct);

router.get("/suggestions", getSuggestions)
router.get("/:id", getaProduct);

router.put("/wishlist", authMiddleware, addToWishlist);

router.put("/:id", authMiddleware, isAdmin, updateProduct);

router.delete("/:id", authMiddleware, isAdmin, deleteProduct);


router.get("/", getAllProduct);

module.exports = router;