const fs = require("fs");
const asyncHandler = require("express-async-handler");

const {
  cloudinaryUploadImg,
  cloudinaryDeleteImg,
} = require("../utils/cloudinary");

const uploadImages = asyncHandler(async (req, res) => {
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;

    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);
    }

    const images = urls.map((file) => file);
    
    res.json({ urls }); // Sending the uploaded images URLs as a response
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({ message: "Failed to upload images" }); // Sending an error response if an error occurs
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  
  try {
    await cloudinaryDeleteImg(id, "images");
    res.json({ message: "Image deleted successfully" }); // Sending a success response after deleting the image
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Failed to delete image" }); // Sending an error response if an error occurs
  }
});

module.exports = {
  uploadImages,
  deleteImages,
};
