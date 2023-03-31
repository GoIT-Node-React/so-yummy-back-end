const { ingredients: service } = require("../services");
const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const { NotFoundError } = require("../helpers/errors");

const getIngredientsController = async (req, res) => {
  const { value } = req.query;
  const result = await service.getIngredients(value);

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
  getIngredientsController: asyncWrapper(getIngredientsController),
};
