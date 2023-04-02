const asyncWrapper = (controller) => (req, res, next) => {
  controller(req, res).catch(next);
};

const responseError = (error) => ({
  status: error.status,
  code: error.code,
  message: error.message,
  data: error.data,
});

const responseData = (data, statusCode) => ({
  status: 'success',
  code: statusCode,
  data,
});

module.exports = {
  asyncWrapper,
  responseData,
  responseError,
};
