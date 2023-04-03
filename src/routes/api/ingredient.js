const express = require("express");
const { ingredient: controller } = require("../../controllers");


const ingredientRouter = express.Router();

ingredientRouter.get("/", controller.getIngredient);
 

module.exports = ingredientRouter;
