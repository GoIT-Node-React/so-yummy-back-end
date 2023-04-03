const jwt = require('jsonwebtoken');
const { asyncWrapper } = require('../../helpers/apiHelpers');
const { ForbiddenError } = require('../../helpers/errors');
const { getUserByRefreshToken } = require('../../services/user');
const { updateTokensById } = require('../../services/auth');

const { JWT_REFRESH_SECRET } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;
  console.log('Refresh token', token);
  try {
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await getUserByRefreshToken(token);

    if (!user) {
      throw new ForbiddenError(403, 'Invalid token');
    }

    const { accessToken, refreshToken } = await updateTokensById(id);

    res.json({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    throw new ForbiddenError('Invalid token');
  }
};

module.exports = asyncWrapper(refresh);
