const { asyncWrapper, responseData } = require("../../helpers/apiHelpers");
const { ownRecipes: service } = require("../../services");
const {
  MAX_LIMIT_PER_PAGE,
  DEFAULT_LIMIT_PER_PAGE,
  DEFAULT_PAGE,
} = require("../../helpers/variables");

const getOwnRecipes = async (req, res) => {
  const { id: owner } = req.user;

  let { page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  limit = +limit > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : +limit;

  const recipes = await service.get(owner, parseInt(page), limit);

  res.json(
    responseData(
      {
        ...recipes,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getOwnRecipes);
