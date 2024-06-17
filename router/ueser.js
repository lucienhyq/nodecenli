const express = require("express");

/**
 * 创建一个Express路由器实例，用于处理特定的HTTP请求。
 */
const router = express.Router();

/**
 * 导入认证中间件。
 * 
 * @note 这里使用了解构赋值来提取中间件函数，以便在路由中使用。
 */
const {
  authenticateUser,
  register_authenticat,
  checkLogin,
} = require("../middleware/authenticate");

/**
 * 设置路由处理程序，用于用户登录认证。
 * 
 * @route POST /login
 * @use authenticateUser 中间件用于验证用户登录凭据。
 */
router.post("/login", authenticateUser);

/**
 * 设置路由处理程序，用于用户注册。
 * 
 * @route POST /register
 * @use register_authenticat 中间件用于处理用户注册逻辑。
 */
router.post("/register", register_authenticat);

/**
 * 导出路由器实例，供其他模块使用。
 */
module.exports = router;