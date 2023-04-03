const { asyncWrapper, responseData } = require('../helpers/apiHelpers');
const { achievements: service } = require('../services');

const getAchievements = async (req, res) => {
  const { id } = req.user;
  const result = await service.achievements(id);

  res.json(
    responseData(
      {
        result,
      },
      200
    )
  );
};

module.exports = {
  get: asyncWrapper(getAchievements),
};
