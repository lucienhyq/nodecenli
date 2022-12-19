const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const refereeListModel = require('../../models/refereeList/refereeList');

var addReferee = async (req, res, next) => {
  console.log(req.session)
  try {
    if (!req.session.user) {
      res.send({
        result: 0,
        data: [],
        msg: '请先登录',
      })
      return;
    }
    const restaurant_id = await getIdmethod.getId('restaurant_id');
    let cBody = req.body;
    let uid = req.session.user.uid ? req.session.user.uid : 0;
    let newAdmin = {
      referee_name: cBody.referee_name,
      referee_Price: cBody.referee_Price,
      referee_ids: restaurant_id,
      create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
      create: Date.parse(new Date()),
      city: cBody.city,
      avatar: cBody.avatar ? cBody.avatar : "default.jpg",
      mobile: cBody.mobile,
      createID: uid
    }
    let userList = await refereeListModel.create(newAdmin);
    res.send({
      result: 1,
      data: userList,
      msg: '裁判信息添加成功',
    })
  } catch (error) {
    res.send({
      result: 0,
      data: [],
      msg: error,
    })
  }
}
module.exports = addReferee;