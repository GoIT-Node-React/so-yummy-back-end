const jwt = require('jsonwebtoken');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { ForbiddenError } = require('../../helpers/errors');
const { getUserByRefreshToken } = require('../../services/user');
const { updateTokensById } = require('../../services/auth');

const { JWT_REFRESH_SECRET } = process.env;

const refresh = async (req, res) => {
  const { refreshToken: token } = req.body;

  try {
    const { id } = jwt.verify(token, JWT_REFRESH_SECRET);
    const user = await getUserByRefreshToken(token);

    if (!user) {
      throw new ForbiddenError(403, 'Invalid token');
    }

    const { accessToken, refreshToken } = await updateTokensById(id);

    res.status(200).json(
      responseData(
        {
          accessToken,
          refreshToken,
        },
        200
      )
    );
  } catch (error) {
    throw new ForbiddenError('Invalid token');
  }
};

module.exports = asyncWrapper(refresh);
