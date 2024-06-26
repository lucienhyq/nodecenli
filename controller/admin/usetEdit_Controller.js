const logger = require("../../logs/logs").logger;
const AdminModel = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");

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
    let json = {};
    if (req.query.member_id) {
      json.id = req.query.member_id;
    }
    let member_list = await AdminModel.find(json);
    if (member_list.length === 0) {
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
var addUser = async (req, res, next) => {
  try {
    let { name, password, mobile } = req.body;
    console.log(name, password, mobile, "wwwwwwwww");
    if (!name || !password || !mobile) {
      res.send({
        data: "",
        msg: "参数错误",
        result: 0,
      });
      return;
    }
    console.log("env", process.env);

    let result = await AdminModel.findOne({ mobile });
    if (!result) {
      const admin_id = await getIdmethod.getId("admin_id");
      let json = {
        user_name: name,
        password: password,
        mobile,
        id: admin_id,
      };
      let addResult = await AdminModel.create(json);
    } else {
      res.send({
        data: "",
        msg: "手机号已经被使用",
        result: 0,
      });
    }
    res.send({
      data: "",
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
  addUser,
};
