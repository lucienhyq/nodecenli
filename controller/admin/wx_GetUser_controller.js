const logger = require("../../logs/logs").logger;
const AdminModel = require("../../models/admin/admin");

var wx_GetUser = async (req, res, next) => {
  try {
    console.log(req.userInfo,'ddddddddd');
    let resolveA = await AdminModel.findOne({ id: req.userInfo.uid });
    logger.info("wx_GetUser.AdminModel", resolveA);
    res.send({
      result: 1,
      data: resolveA,
      msg: "测试",
    });
  } catch (error) {
    logger.info("error" + error);
    next();
  }
};
module.exports = wx_GetUser;
