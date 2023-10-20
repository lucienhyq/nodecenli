const UserAccessModel = require('../../models/admin/UserAccess');
const logger = require('../../logs/logs').logger;

const UserAccess = async (req, res, next) => {
  logger.info(req.query, req.route.path, req.method)
  logger.info(req.session)
  let list = await UserAccessModel.find();
  res.status(200).send({
    result: 1,
    msg: '已经登录',
    data: list
  })
}

module.exports = UserAccess