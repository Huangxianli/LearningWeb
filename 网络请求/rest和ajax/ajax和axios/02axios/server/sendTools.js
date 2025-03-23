const sendSuccessResult = (res, resultData) => {
  res.send({
    status: 'ok',
    code: HTTP_STATUS.OK,
    data: resultData,
  });
};
const sendErrorResult = (res, code, errorInfo) => {
  res.status(code).json({
    status: 'error',
    code,
    data: errorInfo,
  });
};

module.exports = {
  sendSuccessResult,
  sendErrorResult,
};
