const knex = require("knex");
const config = require("../../db/index");
const { hashPassword, comparePassword } = require("../../utils/md5");
const db = knex(config.development); // 或者config.production取决于环境
class Register {
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
  validateIsLOgin(req, res, next) {
    if (req.session.user && req.session.user.id) {
      return false;
    } else {
      return true;
    }
  }
  async validateCheck(req, res, next) {
    try {
      const userExists = await db("users")
        .where("nick_name", this.nick_name)
        .first();
      if (userExists) {
        throw new Error("已存在用户");
      }
    } catch (error) {
      throw error;
    }
  }
  async authenticate(req, res, next) {
    try {
      await this.validateEmail();
      await this.validatePassword();
      await this.validateNickName();
      await this.validateCheck();
      const hashed = await hashPassword(this.password);
      const rows = await db("users").insert({
        email: this.email,
        password: hashed,
        nick_name: this.nick_name,
      });
      console.log(rows);
      if (!rows) {
        throw new Error("注册失败");
      }
    } catch (error) {
      throw error;
    }
  }
  handleSuccess(req, res) {
    res.json({
      status: 200,
      result: 1,
      message: "注册成功",
    });
  }
}
module.exports = Register;
