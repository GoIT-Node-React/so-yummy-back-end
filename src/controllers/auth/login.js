const { auth: service } = require('../../services');
const { asyncWrapper, responseData } = require('../../helpers/apiHelpers');
const { convertUserData } = require('../../helpers/convertUserData');

const login = async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await service.login({ email, password });

  res.status(200).json(
    responseData(
      {
        accessToken,
        refreshToken,
        user: convertUserData(user),
      },
      200
    )
  );
};

module.exports = asyncWrapper(login);
