const cloudinary = require('cloudinary');

const { asyncWrapper, responseData } = require('../helpers/apiHelpers');
const { ownRecipes: service } = require('../services');
const { ValidationError } = require('../helpers/errors');

const createRecipe = async (req, res, next) => {
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
    if (!recipe) {
      return error;
    }

    res.status(201).json(
      responseData(
        {
          recipe,
        },
        201
      )
    );
  } catch (error) {
    console.log(error);
    await cloudinary.v2.uploader.destroy(req.file.filename, 'image');
    //next(error);
    throw new ValidationError('Validation error');
  }
};

const deleteRecipe = async (req, res) => {
  const { id: owner } = req.user;
  const { recipeId } = req.params;
  await service.deleteById(recipeId, owner);

  res.json({
    message: 'Recipe deleted',
  });
};

const getOwnRecipes = async (req, res) => {
  const { id: owner } = req.user;
  let { page = 1, limit = 10 } = req.query;
  limit = +limit > 50 ? 50 : +limit;
  const recipes = await service.get(owner, page, limit);

  res.json(
    responseData(
      {
        ...recipes,
      },
      200
    )
  );
};

module.exports = {
  createRecipe: asyncWrapper(createRecipe),
  deleteRecipe: asyncWrapper(deleteRecipe),
  getOwnRecipes: asyncWrapper(getOwnRecipes),
};
