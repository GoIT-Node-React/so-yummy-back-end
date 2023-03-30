const { search: service } = require("../services");
const { asyncWrapper } = require("../helpers/apiHelpers");
const { NotFoundError } = require("../helpers/errors");

const getIngredientsController = async (req, res) => {};

module.exports = {
  getIngredientsController: asyncWrapper(getIngredientsController),
};
