const { search: service } = require("../services");
const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const { NotFoundError } = require("../helpers/errors");

const getRecipeController = async (req, res) => {
  const { type, value } = req.query;
  const result = await service.getRecipe(type, value);

  if (result.length === 0) {
    res.status(404).json(new NotFoundError());
  }

  res.status(200).json(
    responseData(
      {
        result,
      },
      200
    )
  );
};

module.exports = {
  getRecipeController: asyncWrapper(getRecipeController),
};
