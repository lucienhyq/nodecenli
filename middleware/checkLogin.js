module.exports = function (req, res, next) {
  let jsonArr = {
    data: [],
    result: 0,
    msg: "请登录",
    login:false
  };
  if (!req.session.user && req.body.is != 1) {
    res.json(jsonArr);
  } else {
    next();
  }
};
