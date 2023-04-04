const { Recipe } = require("../../models/recipe");
const { asyncWrapper } = require("../../helpers/apiHelpers");

const getFavorite = async (req, res) => {
  const ObjectId = req.user._id;

  const result = await Recipe.aggregate([
    {
      $match: {
        favorites: {
          $in: [new ObjectId("<user_id>")],
        },
      },
    },
  ]);
  res.json({ result });
};
module.exports = asyncWrapper(getFavorite);
