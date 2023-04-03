const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();
const { ValidationError } = require("../helpers/errors");

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        return {
            folder: "avatars",
            allowedFormats: ["jpg", "jpeg", "png"],
            public_id: `${req.user.id}`,
            transformation: [
                { width: 250, height: 250, crop: "limit" },
                { quality: 100 },
                { fetch_format: "auto" },
                { format: "jpg", filename: `${req.user.id}` },
            ],
        };
    },
});


const uploadAvatar = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.split("/")[0] !== "image") {
            return cb(
                new ValidationError("You can upload only the image file")
            );
        }
        cb(null, true);
    },
});

module.exports = uploadAvatar;
