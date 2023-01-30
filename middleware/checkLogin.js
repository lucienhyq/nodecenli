module.exports = function (req, res, next) {
  let jsonArr = {
    data: [],
    result: 0,
    msg: "请登录",
    login:false
  };
  if (!req.session.user) {
    res.json(jsonArr);
  } else {
    next();
  }
};
