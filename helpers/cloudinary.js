const cloudinary = require("cloudinary").v2;
const { models } = require("mongoose");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

 const { CLOUD_NAME, CLOUD_API_SECRET, CLOUD_API_KEY} = process.env;

 cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});
module.exports= cloudinary;