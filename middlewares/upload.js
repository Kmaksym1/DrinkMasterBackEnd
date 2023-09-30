const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const path = require("path");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});
const tmpDir = path.resolve("tmp");

const multerConfig = multer.diskStorage({
  destination: tmpDir,
  filename: (_, file, cb) => {
    const { originalname } = file;
    const uniquePrefix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const fileName = `${uniquePrefix}_${originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: multerConfig });





// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: async (req, file) => {
//     let folder;
//     if (file.fieldname === "avatar") {
//       folder = "avatars";
//     } else if (file.fieldname === "cocktail") {
//       folder = "cocktails";
//     } else {
//       folder = "others";
//     }
//     return {
//       folder: folder,
//       allowed_formats: ["jpg", "png"], // Adjust the allowed formats as needed
//       public_id: file.originalname, // Use original filename as the public ID
//       transformation: [
//         { width: 350, height: 350 },
//         { width: 700, height: 700 },
//       ],
//     };
//   },
// });

// const upload = multer({ storage });

module.exports = upload;
