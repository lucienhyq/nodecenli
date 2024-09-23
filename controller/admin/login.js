const AdminModel = require("../../models/admin/admin");
const secretKey = require("../../js/jwt");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
var login = async (req, res, next) => {
  let fields = req.method == "GET" ? req.query : req.body;
  try {
    var user = await AdminModel.findOne({ user_name: fields.user_name });
    if (!user || !fields) {
      res.send({
        result: 0,
        msg: "没有此用户",
        data: "",
      });
      return;
    }
    // 使用bcrypt比较明文密码与数据库中存储的哈希密码
    const isPasswordValid = await bcrypt.compare(
      fields.password,
      user.password
    );
    if (!isPasswordValid) {
      res.send({
        result: 0,
        msg: "账号密码错误",
      });
      return;
    }
    // 密码验证成功，继续后续逻辑
    if (fields.login_type === "pc" && user.admin !== 1) {
      res.send({
        result: 0,
        msg: "不是管理员账号,无权限",
      });
      return;
    }
    const tokenStr = jwt.sign(
      { username: fields.user_name, id: user.id },
      secretKey,
      { expiresIn: "8h" }
    );
    // 注意：通常不会将密码存储在session中，已注释掉
    req.session.user = {
      userName: user.user_name,
      uid: user.id,
    };
    res.send({
      result: 1,
      msg: "登录成功",
      data: { token: tokenStr, id: user.id },
      session: req.session.user,
    });
  } catch (error) {
    logger.info("error" + error);
    next();
  }
};

module.exports = login;
