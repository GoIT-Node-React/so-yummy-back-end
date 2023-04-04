const { recipes: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const getMainPage = async (_req, res) => {
  const result = await service.getRecipesByCategories();

  return res.status(200).json(
    responseData(
      {
        categories: result,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getMainPage);
