const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger.json");
const { responseError } = require("./helpers/apiHelpers");
const { RouteNotFoundError } = require("./helpers/errors");
const { error: errorMiddleware } = require("./middlewares");
const routes = require("./routes/api");

const app = express();
const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// add you routes here

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use("/api/auth", routes.auth);
app.use("/api/ingredients", routes.ingredients);
app.use("/api/users", routes.users);
app.use("/api/shopping-lists", routes.shoppingListRouter);
app.use("/api/recipes", routes.recipes);

//==========================

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

module.exports = app;
