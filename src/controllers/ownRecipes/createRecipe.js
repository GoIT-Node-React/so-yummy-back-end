const cloudinary = require('cloudinary');

const { ValidationError } = require('../../helpers/errors');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { ownRecipes: service } = require('../../services');

const createRecipe = async (req, res) => {
  const { id: owner } = req.user;
  const recipeData = req.body;
  const data = {
    ...recipeData,
    owner,
    thumb: req.file.path,
    cloudinaryImageName: req.file.filename,
  };

  try {
    const recipe = await service.create(data);

    res.status(201).json(
      responseData(
        {
          recipe,
        },
        201
      )
    );
  } catch (error) {
    await cloudinary.v2.uploader.destroy(req.file.filename, 'image');
    throw new ValidationError('Validation error');
  }
};

module.exports = asyncWrapper(createRecipe);
