const refereeListModel = require('../../models/refereeList/refereeList');
const logger = require('../../logs/logs').logger

var allReferee = async (req, res, next) => {
  console.log(req.session.user)
  if(req.body.is = 1){
    let list = await refereeListModel.find({});
    res.send({
      result: 1,
      msg: '已经登录',
      data: list,
      total: await refereeListModel.find({}).count(),
    })
    return
  }
  if (req.session.user) {
    let list = await refereeListModel.find({});
    res.send({
      result: 1,
      msg: '已经登录',
      data: {
        data: list,
        total: await refereeListModel.find({}).count(),
      }
    })
  } else {
    // res.send({
    //   result: 0,
    //   msg: '请先登录',
    //   data: {}
    // })
    formatErrorMessage(res,'请先登录')
  }
}

// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": message || '',
  });
}

module.exports = allReferee