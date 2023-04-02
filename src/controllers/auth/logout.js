const { asyncWrapper } = require('../../helpers/apiHelpers');
const { auth: service } = require('../../services');

const logout = async (req, res) => {
  const { id } = req.user;

  await service.logout(id);

  res.sendStatus(204);
};

module.exports = asyncWrapper(logout);
