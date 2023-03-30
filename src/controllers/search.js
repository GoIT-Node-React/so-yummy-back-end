const { search: service } = require("../services");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { NotFoundError } = require("../helpers/errors");

const getRecipeController = async (req, res) => {
  const { type, value } = req.query;
  const result = await service.getRecipe(type, value);

  if (result.length === 0) {
    res.status(404).json(new NotFoundError());
  }

  res.json({
    status: "200",
    data: {
      result,
    },
  });
};

module.exports = {
  getRecipeController: asyncWrapper(getRecipeController),
};
