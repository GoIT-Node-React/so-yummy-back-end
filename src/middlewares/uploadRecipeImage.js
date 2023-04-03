const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const { ValidationError } = require('../helpers/errors');
require('dotenv').config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes',
    allowedFormats: ['jpg', 'png'],
  },
});

const uploadCloud = multer({
  storage,
  fileFilter: (_req, file, cb) => {
    const [type] = file.mimetype.split('/');

    if (type !== 'image') {
      return cb(new ValidationError('You can upload only the image file'));
    }

    cb(null, true);
  },
});

module.exports = uploadCloud;
