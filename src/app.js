const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');
const { responseError } = require('./helpers/apiHelpers');
const { RouteNotFoundError } = require('./helpers/errors');
const { error: errorMiddleware } = require('./middlewares');
const routes = require('./routes/api');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// add you routes here

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/auth', routes.auth);
app.use('/api/own-recipes', routes.ownRecipes);
app.use('/api/popular-recipes', routes.popularRecipes);
app.use('/api/achievements', routes.achievements);
app.use('/api/search', routes.search);
app.use('/api/ingredients', routes.ingredients);
//==========================

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

module.exports = app;
