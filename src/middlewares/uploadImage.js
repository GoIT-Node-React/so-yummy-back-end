const cloudinary = require('cloudinary').v2;
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
require('dotenv').config();
const { ValidationError } = require('../helpers/errors');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const avatarStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req) => {
    return {
      folder: 'avatars',
      allowedFormats: ['jpg', 'jpeg', 'png'],
      public_id: `${req.user.id}`,
      transformation: [
        { width: 250, height: 250, crop: 'limit' },
        { quality: 100 },
        { fetch_format: 'auto' },
        { format: 'jpg', filename: `${req.user.id}` },
      ],
    };
  },
});

const recipeStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'recipes',
    allowedFormats: ['jpg', 'png'],
    transformation: [{ width: 600, height: 600, crop: 'limit' }],
  },
});

const fileFilter = (_req, file, cb) => {
  const [type] = file.mimetype.split('/');

  if (type !== 'image') {
    return cb(new ValidationError('You can upload only the image file'));
  }

  cb(null, true);
};

// Avatar multer
const avatarImage = multer({
  storage: avatarStorage,
  fileFilter,
});

// Recipe multer
const recipeImage = multer({
  storage: recipeStorage,
  fileFilter,
});

module.exports = {
  avatarImage,
  recipeImage,
};
