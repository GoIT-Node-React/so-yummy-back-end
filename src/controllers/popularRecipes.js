const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const { popularRecipes } = require("../services/popularRecipes");
const popularRecipesController = async (req, res) => {
  let { page = 1, limit = 10 } = req.query;
  limit = +limit > 50 ? 50 : +limit;
  const recipes = await popularRecipes(page, limit);
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
  getRecipes: asyncWrapper(popularRecipesController),
};
