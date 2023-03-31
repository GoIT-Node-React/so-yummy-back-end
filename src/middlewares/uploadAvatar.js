const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
require("dotenv").config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: (req, file) => {
        // const userName = (req) => {
        //     const { name: currentName } = req.user;
        //     const { name: newName } = req.body;

        //     if (newName) {
        //         return newName;
        //     } else {
        //         return currentName;
        //     }
        // };
        return {
            folder: "avatars",
            allowedFormats: ["jpg", "png"],
            public_id: `${req.user.id}`,
            transformation: [{ width: 250, height: 250, crop: "limit" }],
        };
    },
    filename: (req, file, cb) => {
        cb(null, `${req.user.name}_${req.user.id}`);
    },
});

const uploadAvatar = multer({ storage });
module.exports = uploadAvatar;
