const cloudinary = require("cloudinary");
const fs = require("fs");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.SECRET_KEY,
});

const cloudinaryUploadImg = async (path) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(path, { folder: "products" }, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    });
  });
};

const cloudinaryDeleteImg = async (public_id) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(public_id, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve({
          result,
        });
      }
    });
  });
};

const uploadImage = async (req, res) => {
  try {
    const files = req.files;
    const uploadedImages = [];

    for (const file of files) {
      const { path } = file;
      const uploadedImage = await cloudinaryUploadImg(path);
      uploadedImages.push(uploadedImage);
      fs.unlinkSync(path); // Delete local file after upload
    }

    res.json(uploadedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {  cloudinaryDeleteImg, cloudinaryUploadImg };
