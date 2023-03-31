const { search: service } = require("../services");
const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const { NotFoundError } = require("../helpers/errors");

const getRecipeController = async (req, res) => {
  const { type, value, page = 1, limit = 5 } = req.query;
  const result = await service.getRecipe(type, value, page, limit);

  if (result.length === 0) {
    res.status(404).json(new NotFoundError());
  }

  res.status(200).json(
    responseData(
      {
        result,
        limit: parseInt(limit) > 5 ? 5 : parseInt(limit),
        page: parseInt(page),
      },
      200
    )
  );
};

module.exports = {
  getRecipeController: asyncWrapper(getRecipeController),
};
