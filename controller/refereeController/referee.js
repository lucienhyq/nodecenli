const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const refereeListModel = require('../../models/refereeList/refereeList');
const logger = require('../../logs/logs').logger;
class referee {
  // 添加裁判
  async addReferee(req, res, next) {
    try {
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
        avatar: cBody.avatar ? cBody.avatar : "photo-mr.jpg",
        mobile: cBody.mobile,
        createID: uid,
        level: cBody.level
      }
      let userList = await refereeListModel.create(newAdmin);
      res.send({
        result: 1,
        data: userList,
        msg: '裁判信息添加成功',
      })
    } catch (error) {
      formatErrorMessage(error);
      logger.error('error' + error);
    }
  };
  // 编辑裁判信息
  async updateReferee(req, res, next){
    try {
      if(!req.body.id){
        formatErrorMessage(res,'请选择编辑的裁判')
        return
      }
      // updateOne 更新一个，updateMany 更新多个
      let json = {};
      if (req.body.referee_name) {
        json.referee_name = req.body.referee_name;
      }
      if (req.body.referee_Price) {
        json.referee_Price = req.body.referee_Price;
      }
      if (req.body.avatar) {
        json.avatar = req.body.avatar;
      }
      if (req.body.city) {
        json.city = req.body.city;
      }
      if (req.body.mobile) {
        json.mobile = req.body.mobile;
      }
      const findInfo = await refereeListModel.findOne({ referee_ids: Number(req.body.id) });
      if (!findInfo) {
        logger.info('没有这个裁判,uid:' + req.session.user.uid)
        next("没有这个裁判")
        return
      }
      if (Object.keys(json).length == 0) {
        logger.info('没有更改内容,uid:' + req.session.user.uid)
        next("没有更改内容")
        return
      }
      const updateinfo = await refereeListModel.updateOne({ 'referee_ids': Number(req.body.id) }, json);
      if (!updateinfo) {
        logger.info('编辑失败,uid:' + req.session.user.uid)
        next("编辑失败")
        return
      }
      res.send({
        result: 1,
        data: [],
        msg: '编辑成功',
      })
    } catch (error) {
      formatErrorMessage(res,error)
      logger.info('error' + error)
    }
  };
  // 搜索裁判列表
  async searchReferee(req, res, next){
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
        console.log(pageInd,PageSize,count)
        if (((pageInd - 1) * PageSize + 1) >= count) {
          let findArr = await refereeListModel.find().sort({ referee_ids: '-1' });
          res.send({
            result:1,
            data:{
              list:findArr,
              last_page:1,
              total:1
            },
            msg:'成功'
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
  };
  async allReferee(req, res, next){
    try {
      if (req.body.is == 1) {
        let list = await refereeListModel.find({}).sort({ referee_ids: -1 }).limit(6);
        res.send({
          result: 1,
          msg: '测试接口',
          data: list,
          total: await refereeListModel.find({}).count(),
        })
        return
      }
      let list = await refereeListModel.find({});
      res.send({
        result: 1,
        msg: '已经登录',
        data: {
          data: list,
          total: await refereeListModel.find({}).count(),
        }
      })
    } catch (error) {
      formatErrorMessage(error);
      logger.error('error' + error);
    }
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
module.exports = new referee();