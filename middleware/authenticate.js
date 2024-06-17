// middleware/authenticate.js
const Login = require("../controller/user/login");
const Register = require("../controller/user/register");
const ResponseHandler = require("../utils/responseHandler");
// middleware/authenticate.js
const authenticateUser = async (req, res, next) => {
  try {
    let email = req.method == "POST" ? req.body.email : req.query.email;
    let password =
      req.method == "POST" ? req.body.password : req.query.password;
    let nick_name =
      req.method == "POST" ? req.body.nick_name : req.query.nick_name;

    const loginInstance = new Login(email, password, nick_name);
    console.log(loginInstance.validateIsLOgin(req, res, next), "fffffffffff");
    if (!loginInstance.validateIsLOgin(req)) {
      res.json({
        status: 200,
        result: 1,
        message: "登录成功1",
      });
      return;
    }
    // 调用authenticate方法，它内部会调用validatePassword等并可能抛出错误
    await loginInstance.authenticate();
    // 如果authenticate没有抛出错误，说明认证成功
    let { id } = loginInstance.userExists;
    let isnick_name = loginInstance.userExists.nick_name;
    req.session.user = { id, isnick_name };
    res.json({
      status: 200,
      result: 1,
      message: "登录成功",
    });
  } catch (error) {
    if (
      error.message === "密码不能为空" ||
      error.message === "无效的邮箱格式"
    ) {
      return ResponseHandler.sendResponse(res, 400, 0, "错误的请求参数", null);
    } else if (error.message.includes("用户名或密码错误")) {
      return ResponseHandler.sendResponse(
        res,
        401,
        0,
        "用户名或密码错误",
        null
      );
    } else {
      return ResponseHandler.sendResponse(res, 500, 0, "服务器错误", null);
    }
  }
};
const register_authenticat = async (req, res, next) => {
  try {
    let email = req.method == "POST" ? req.body.email : req.query.email;
    let password =
      req.method == "POST" ? req.body.password : req.query.password;
    let nick_name =
      req.method == "POST" ? req.body.nick_name : req.query.nick_name;
    const register_Instance = new Register(email, password, nick_name);
    if (!register_Instance.validateIsLOgin(req)) {
      res.json({
        status: 200,
        result: 1,
        message: "已登录",
      });
      return;
    }
    await register_Instance.authenticate();
    res.json({
      status: 200,
      result: 1,
      message: "注册成功",
    });
  } catch (error) {
    const errorMessages = [
      "密码不能为空",
      "无效的邮箱格式",
      "昵称不能为空",
      "已存在用户",
    ];
    if (errorMessages.includes(error.message)) {
      return ResponseHandler.sendResponse(res, 400, 0, error.message, null);
    } else if (error.message.includes("用户名或密码错误")) {
      return ResponseHandler.sendResponse(
        res,
        401,
        0,
        "用户名或密码错误",
        null
      );
    } else {
      return ResponseHandler.sendResponse(res, 500, 0, "服务器错误", null);
    }
  }
};
const checkLogin = async (req, res, next) => {
  try {
    if (req.session.user) {
      console.log("用户是已登录");
      return next();
    } else {
      // return ResponseHandler.sendResponse(res, 401, 0, "用户未登录", null);
      console.log("用户未登录");
      return next();
    }
  } catch (error) {
    return ResponseHandler.sendResponse(res, 500, 0, "服务器错误", null);
  }
};
module.exports = { authenticateUser, register_authenticat, checkLogin };
