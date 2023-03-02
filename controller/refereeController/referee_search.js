const refereeListModel = require('../../models/refereeList/refereeList');
const logger = require('../../logs/logs').logger;
/**
 * 
 * @param {name 裁判姓名,city 裁判所在地,creatId 创建裁判会员,level 裁判资格等级} req 
 * @param {*} res 
 * @param {*} next 
 * @returns 
 */
const searchReferee = async (req, res, next) => {
  logger.info(req.body,req.route);
  try {
    let json = {};
    // 用正则进行模糊搜索
    let name = new RegExp(req.body.name, 'i');
    let city = new RegExp(req.body.city, 'i');
    if (req.body.name) {
      json.referee_name = name;
    }
    if (req.body.city) {
      json.city = city;
    }
    if (req.body.creatId) {
      json.creatId = req.body.creatId;
    }
    if (req.body.level) {
      json.level = req.body.level;
    }
    let PageSize = req.body.per_total || 15; //一次返回15条数据默认
    let pageInd = req.body.page || 1; //当前第几页
    refereeListModel.count({}, async (err, count) => {
      if (((pageInd - 1) * PageSize + 1) >= count) {
        res.send({
          status: "extend",
        })
      } else {
        let findArr = await refereeListModel.find(json).skip(pageInd == 1 ? 0 : (pageInd - 1) * PageSize + 1).limit(PageSize).sort({ referee_ids: '-1' });
        res.send({
          result: 1,
          data: {
            last_page: parseInt(count / PageSize) ? parseInt(count / PageSize) : 1,
            list: findArr,
            total: count
          },
          msg: '',
        })
      }

    })

  } catch (error) {
    logger.info('error' + error);
    next(error);
  }
}
module.exports = searchReferee;