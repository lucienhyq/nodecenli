const UserAccessModel = require("../../models/admin/UserAccess");
const adminModel = require("../../models/admin/admin");
const dtime = require("time-formater");

const logger = require("../../logs/logs").logger;
/**
 *userId：用户ID，引用了另一个名为User的集合中的文档。

  ipAddress：用户访问时的IP地址。 req.ip或request-ip第三方中间件

  userAgent：用户访问时的User-Agent字符串。 req.headers['user-agent'];

  timestamp：用户访问的时间戳。
  
 * @param {userId} req 
 * @param {*} res 
 * @param {*} next 
 */
const UserAccess = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method);
  try {
    if (req.user) {
      let findUser = await adminModel.find({ id: Number(req.user.uid) });
      let memberuserFind = {
        user_name: findUser[0].user_name,
        avatar: findUser[0].avatar,
        id: findUser[0].id,
      };
      let list;
      let json = {
        userId: req.user.uid,
        ipAddress: req.ip,
        userAgent: req.headers["user-agent"],
        memberUser: memberuserFind,
        timestamp: dtime().format("YYYY-MM-DD HH:mm:ss"),
      };
      let findInd = await UserAccessModel.find({ userId: req.user.uid });
      if (findInd.length > 0) {
        json.total = Number(findInd[0].total) + 1;
        await UserAccessModel.updateOne(
          { userId: Number(req.user.uid) },
          json
        );
      } else {
        list = await UserAccessModel.create(json);
      }
      next();
    }else{
      
    }
    console.log(req.user);
  } catch (error) {
    formatErrorMessage(res, error);
    logger.error("errorUserAccess" + error);
  }
};

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || "",
  });
}
module.exports = UserAccess;
