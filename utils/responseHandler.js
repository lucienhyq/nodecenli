// responseHandler.js
class ResponseHandler {
  static success(data = null, message = '操作成功') {
    return {
      result: 1,
      msg: message,
      data,
    };
  }

  static error(statusCode = 500, message = '服务器错误') {
    return {
      result: 0,
      msg: message,
    };
  }

  static sendResponse(res, statusCode, result, message, data = null) {
    res.status(statusCode).json({
      result,
      msg: message,
      data,
    });
  }
}

module.exports = ResponseHandler;