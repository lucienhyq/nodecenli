module.exports = function (req, res, next) {
  let jsonArr = {
    data: [] || {},
    result: 0,
    msg: "ok",
  };
  if (!req.session.user) {
    res.json(jsonArr);
  } else {
    next();
  }
};
