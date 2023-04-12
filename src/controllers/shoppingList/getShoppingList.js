const { shoppingList: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { MAX_LIMIT_PER_PAGE, DEFAULT_LIMIT_PER_PAGE, DEFAULT_PAGE } = require('../../helpers/variables');

const getShoppingList = async (req, res) => {
  const { id } = req.user;
  const { limit = DEFAULT_LIMIT_PER_PAGE, page = DEFAULT_PAGE } = req.query;
  const pageLimit = parseInt(limit) > MAX_LIMIT_PER_PAGE ? MAX_LIMIT_PER_PAGE : parseInt(limit);

  let shoppingList;

  if (req.query.page) {
    shoppingList = await service.getByUserId(id, pageLimit, parseInt(page));
  } else {
    shoppingList = await service.getAll(id);
  }

  res.status(200).json(responseData(shoppingList, 200));
};

module.exports = asyncWrapper(getShoppingList);
