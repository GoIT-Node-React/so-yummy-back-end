const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((_, res) => {
  //res.status(404).json(responseError(new RouteNotFoundError()));
});

//app.use(errorMiddleware);

module.exports = app;
