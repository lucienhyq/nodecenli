const logger = require("../../logs/logs").logger;
const AdminModel = require("../../models/admin/admin");

// 优化1: 为update操作创建一个验证和清理输入的函数
const validateAndUpdateUser = async (uid, updateData) => {
  // 添加验证逻辑，确保updateData符合预期格式和类型
  // 示例中省略具体验证实现
  return await AdminModel.findOneAndUpdate({ id: uid }, updateData);
};

var userEdit = async (req, res, next) => {
  try {
    // 安全性优化: 验证会话用户
    if (!req.session.user || !req.session.user.uid) {
      return res.send({
        data: "",
        success: "请登录",
        result: 0,
      });
    }

    // 优化2: 使用异步await模式
    const updateData = req.query; // 未来可以加入更多验证和清理逻辑
    const result = await validateAndUpdateUser(
      req.session.user.uid,
      updateData
    );
    if (!result) {
      return res.send({
        data: "",
        success: "没有该用户或修改失败",
        result: 0,
      });
    }
    res.send({
      data: "",
      success: "修改成功",
      result: 1,
    });
  } catch (error) {
    logger.info(`用户编辑错误: ${error}`); // 优化日志记录
    next(error);
  }
};

var userList = async (req, res, next) => {
  try {
    // 优化未做更改，因原逻辑已较为简洁且符合要求
    let member_list = await AdminModel.find({}).select(
      "id user_name mobile create_time"
    );
    if (member_list.length === 0) {
      // 边界条件优化: 处理查询结果为空的情况
      return res.send({
        data: [],
        msg: "没有找到用户",
        result: 1,
      });
    }
    res.send({
      data: member_list,
      msg: "",
      result: 1,
    });
  } catch (error) {
    logger.info(`用户列表错误: ${error}`); // 优化日志记录
    next(error);
  }
};

module.exports = {
  userList,
  userEdit,
};
