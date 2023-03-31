const { NotFoundError } = require("../helpers/errors");
const {
  createRecipe,
  deleteRecipe,
  getRecipes,
} = require("../services/ownRecipes");
const { asyncWrapper, responseData } = require("../helpers/apiHelpers");

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
  res.status(201).json(
    responseData(
      {
        recipe,
      },
      201
    )
  );
};

const deleteRecipeController = async (req, res) => {
  const { id: owner } = req.user;
  const { recipeId } = req.params;
  const result = await deleteRecipe(recipeId, owner);
  if (!result) {
    throw new NotFoundError();
  }
  res.json({
    message: "Recipe deleted",
  });
};

const getOwnRecipesController = async (req, res) => {
  const { id: owner } = req.user;
  let { page = 1, limit = 10 } = req.query;
  limit = +limit > 100 ? 100 : +limit;
  const recipes = await getRecipes(owner, page, limit);
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
  createRecipe: asyncWrapper(createRecipeController),
  deleteRecipe: asyncWrapper(deleteRecipeController),
  getOwnRecipes: asyncWrapper(getOwnRecipesController),
};
