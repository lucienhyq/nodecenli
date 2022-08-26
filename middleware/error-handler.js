const util = require("util");

// 处理错误中间件
module.exports = () => {
  return (err, req, res, next) => {
    res.status(500).json({
      error: util.format(err),
      result: 0,
    });
  };
};
