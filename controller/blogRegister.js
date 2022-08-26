const path = require("path");
var mongo = require("../routes/shujukufangfafengzhuang");
var ObjectId = require("mongodb").ObjectID;

// 用户注册
/**
 *
 * @param {*} req  userName 注册用户账号  password 注册用户密码
 * @param {*} res
 * @param {*} next
 */
exports.register = async (req, res, next) => {
  try {
    let findIndex = await new Promise((resolve, rejects) => {
      mongo("findAll", "user", {}, function (data) {
        resolve(data);
      });
    });
    console.log(findIndex)
    let findStatus = await new Promise((resolve, rejects) => {
      mongo("find", "user", { userName: req.query.userName }, function (data) {
        if (data.length == 0) {
          if (!req.query.userName || !req.query.password) {
            next("请输入正确账号密码");
          } else {
            resolve(true);
          }
        } else {
          next("用户名已经被注册");
        }
      });
    });
    if (findStatus) {
      // 没有查找到这个用户名称可以注册
      let json = {
        userName: req.query.userName,
        password: req.query.password,
        // 会员id
        id: findIndex.length == 0 ? 1 : findIndex.length + 1,
      };
      mongo("add", "user", json, function (result) {
        if (result.length != 0) {
          res.send('{"success":"注册成功"}');
        } else {
          res.send('{"success":"注册失败"}');
        }
      });
    }
  } catch (err) {
    next(err);
  }
};

// 用户登录

/**
 *
 * @param {*} req  userName 注册用户账号 password 注册用户密码
 * @param {*} res
 * @param {*} next
 */
exports.login = async (req, res, next) => {
  try {
    let findData = await new Promise((resolve, rejects) => {
      mongo("find", "user", { userName: req.query.userName }, function (data) {
        if (data.length == 0) {
          if (!req.query.userName || !req.query.password) {
            next("请输入正确账号密码");
          } else {
            next("没有此会员");
          }
        } else {
          resolve(data);
        }
      });
    });
    if (findData) {
      // 有这个会员验证密码
      let password = findData[0].password;
      if (password == req.query.password) {
        req.session.user = {
          userName: findData[0].userName,
          password: findData[0].password,
          id: findData[0].id,
        };
        // console.log('登录成功',res.session.user)
        let arrjson = {
          data: req.session.user,
          result: 1,
          msg: "登录成功",
        };
        res.json(arrjson);
      } else {
        next("密码错误");
      }
    }
  } catch (error) {
    next(error);
  }
};
