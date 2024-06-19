const UserAccessModel = require("../../models/admin/UserAccess");
const logger = require("../../logs/logs").logger;

const UserAccess = async (req, res, next) => {
  let list = await UserAccessModel.find();
  logger.info(req.session, list, "ddddddddddddddddddd");
  res.status(200).send({
    result: 1,
    msg: "",
    data: list,
  });
};

module.exports = UserAccess;
