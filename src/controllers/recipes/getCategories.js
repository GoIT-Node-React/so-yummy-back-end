const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { CATEGORIES } = require('../../helpers/variables');

const getCategories = async (_req, res) => {
  return res.status(200).json(
    responseData(
      {
        categories: CATEGORIES,
      },
      200
    )
  );
};

module.exports = asyncWrapper(getCategories);
