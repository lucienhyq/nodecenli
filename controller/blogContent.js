const path = require("path");
var mongo = require("../routes/shujukufangfafengzhuang");
var ObjectId = require("mongodb").ObjectID;
let jsonArr = {
  data: [] || {},
  result: 0,
  msg: "ok",
};

/**
 *
 * @param {*} req  userName 注册用户账号 password 注册用户密码
 * @param {*} res
 * @param {*} next
 */
exports.contentIndex = async (req, res, next) => {
  try {
    console.log(req.session.user);
    res.json(this.jsonArr)
  } catch (error) {
    next(error);
  }
};
/**
 * 
 * @param {*
 * title
 * uid
 * conten
 * 
 * } req 
 * @param {*} res 
 * @param {*} next 
 */
exports.contentAdd = async (req, res, next) => {
  try {
    console.log(req.session.user);
    res.send(':ddd /contentIndex')
  } catch (error) {
    next(error);
  }
};
