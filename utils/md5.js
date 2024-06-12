const bcrypt = require('bcryptjs');

/**
 * 生成哈希密码
 * @param {string} password 明文密码
 * @return {Promise<string>} 返回哈希后的密码
 */
async function hashPassword(password) {
  const saltRounds = 10; // 哈希的轮数，越高越安全但也越慢
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

/**
 * 验证密码
 * @param {string} password 明文密码
 * @param {string} hashedPassword 哈希后的密码
 * @return {Promise<boolean>} 返回验证是否通过
 */
async function comparePassword(password, hashedPassword) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}

module.exports = { hashPassword, comparePassword };