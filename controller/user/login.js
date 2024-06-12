// controller/login.js
const knex = require("knex");
const config = require("../../db/index");
const { hashPassword, comparePassword } = require("../../utils/md5");
const db = knex(config.development); // 或者config.production取决于环境
class Login {
  constructor(email, password, nick_name) {
    this.email = email;
    this.password = password;
    this.nick_name = nick_name;
  }

  // 假设的验证邮箱格式方法
  validateEmail(req, res, next) {
    if (!this.email || !/\S+@\S+\.\S+/.test(this.email)) {
      throw new Error("无效的邮箱格式");
    }
  }

  // 假设的密码验证逻辑，这里简化处理
  validatePassword(req, res, next) {
    // 实际应用中，这里应包含更复杂的密码验证逻辑
    if (!this.password) {
      throw new Error("密码不能为空");
    }
  }
  validateNickName(req, res, next) {
    if (!this.nick_name) {
      throw new Error("昵称不能为空");
    }
  }

  // 假设的登录验证方法，实际应包含数据库查询等操作
  async authenticate(req, res, next) {
    try {
      this.validateNickName(); // 调用验证方法
      this.validatePassword(); // 调用验证方法
      const userExists = await db("users")
        .where("nick_name", this.nick_name)
        .orWhere("email", this.email)
        .first();
      let result = await comparePassword(this.password, userExists.password);
      if (!result) {
        throw new Error("用户名或密码错误");
      }
    } catch (error) {
      throw error;
    }
  }

  // 成功登录后的处理，如设置session、返回JWT等
  handleSuccess(req, res) {
    res.status(200).json({ message: "登录成功" });
  }
}
module.exports = Login;
