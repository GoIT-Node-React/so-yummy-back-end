const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');

const currentUser = async (req, res) => {
  res.status(200).json(responseData({ user: req.user }, 200));
};

module.exports = asyncWrapper(currentUser);
