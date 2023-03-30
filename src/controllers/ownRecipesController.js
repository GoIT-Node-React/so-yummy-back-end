const { NotFoundError } = require("../helpers/errors");
const {
  createRecipe,
  deleteRecipe,
  getRecipes,
} = require("../services/ownRecipesService");
const { asyncWrapper } = require("../helpers/apiHelpers");
const createRecipeController = async (req, res) => {
  const { id: owner } = req.user;
  const recipeData = req.body;
  const data = {
    ...recipeData,
    owner,
    thumb: req.file.path,
    cloudinaryImageName: req.file.filename,
  };
  const recipe = await createRecipe(data);
  res.json({
    code: 201,
    message: "Created",
    data: {
      recipe,
    },
  });
};

const deleteRecipeController = async (req, res) => {
  /*delete image from cloudinary*/
  const { id: owner } = req.user;
  const { recipeId } = req.params;
  const result = await deleteRecipe(recipeId, owner);
  if (!result) {
    throw new NotFoundError();
  }
  res.json({
    code: 200,
    message: "recipe deleted",
  });
};

const getOwnRecipesController = async (req, res) => {
  const { id: owner } = req.user;
  let { page = 1, limit = 4 } = req.query;
  const recipes = await getRecipes(owner, page, limit);
  res.json({
    status: "success",
    code: 200,
    data: {
      recipes,
      page,
      limit,
    },
  });
};

module.exports = {
  createRecipe: asyncWrapper(createRecipeController),
  deleteRecipe: asyncWrapper(deleteRecipeController),
  getOwnRecipes: asyncWrapper(getOwnRecipesController),
};
