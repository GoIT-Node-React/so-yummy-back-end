const { asyncWrapper, responseData } = require("../helpers/apiHelpers");
const { achievements: service } = require("../services");

const getAchievements = async (req, res) => {
  const { id } = req.user;
  const result = await service.achievements(id);
  res.json({
    data: {
      result,
    },
  });
};

module.exports = {
  get: asyncWrapper(getAchievements),
};
