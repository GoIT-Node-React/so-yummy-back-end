const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const { responseError } = require('./helpers/apiHelpers');
const { RouteNotFoundError } = require('./helpers/errors');
const { errorMiddleware } = require('./middlewares/errors');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// add you routes here

//==========================

app.use((_, res) => {
  res.status(404).json(responseError(new RouteNotFoundError()));
});

app.use(errorMiddleware);

module.exports = app;
