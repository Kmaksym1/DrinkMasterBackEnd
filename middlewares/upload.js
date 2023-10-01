const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    let folder;
    let transformation = [];

    switch (file.fieldname) {
      case "avatar":
        folder = "avatars";
        transformation.push(
          { crop: "crop", gravity: "face", height: 200, width: 200 },
          { crop: "scale", width: 45 }
        );
        break;
      case "drinkThumb":
        folder = "cocktails";
        transformation({ width: 400 });
        break;
      default:
        folder = "others";
        break;
    }

    return {
      folder,
      transformation,
      allowed_formats: ["jpg", "jpeg", "png"],
      public_id: `avatar_${req.user._id}`,
    };
  },
});

const upload = multer({ storage: storage });

module.exports = upload;
