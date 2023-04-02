const { asyncWrapper } = require('../../helpers/apiHelpers');
const { updateTokensById } = require('../../services/auth');

const { FRONT_END_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;
  const { accessToken, refreshToken } = await updateTokensById(id);

  res.redirect(`${FRONT_END_URL}?accessToken=${accessToken}&refreshToken=${refreshToken}`);
};

module.exports = asyncWrapper(googleAuth);
