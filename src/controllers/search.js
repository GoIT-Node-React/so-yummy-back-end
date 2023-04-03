const { search: service } = require('../services');
const { asyncWrapper, responseData } = require('../helpers/apiHelpers');

const { MAX_LIMIT_PER_PAGE, DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } = require('../helpers/variables');

const getRecipeByTitleController = async (req, res) => {
  const { type, value, page = DEFAULT_PAGE, limit = DEFAULT_LIMIT_PER_PAGE } = req.query;
  const result = await service.getRecipeByTitle(type, value, page, limit);

  const recipes = result[0].recipes;
  const total = result[0].total;

  res.status(200).json(
    responseData(
      {
        recipes,
        total,
        limit: parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit),
        page: parseInt(page),
      },
      200
    )
  );
};

module.exports = {
  getRecipeByTitle: asyncWrapper(getRecipeByTitleController),
};
