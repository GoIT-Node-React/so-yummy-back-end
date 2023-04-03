const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const {
  MAX_LIMIT_PER_PAGE,
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} = require("../helpers/variables");
const { popularRecipes: service } = require("../services");

const popularRecipes = async (req, res) => {
  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.get(page, limit);

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
  getRecipes: asyncWrapper(popularRecipes),
};
