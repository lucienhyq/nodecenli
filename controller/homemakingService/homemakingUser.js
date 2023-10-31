const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const homemakingUser = require('../../models/homemaking/homemakingUser');
const logger = require('../../logs/logs').logger;

class homemaking {
  async homemakingList(req,res,next){
    try {
      homemakingUser.findById('6540cf79fdb5ec88c04e6e25')
        .populate('creatUid')
        .exec((err,list)=>{
          console.log(list,err)
        })
      res.send({
        data:'1111'
      })
    } catch (error) {
      
    }
  }
  async addHomemaking(req, res, next) {
    try {
      let cBody = req.body;
      let { realname, avatar, mobile, workTime } = cBody;
      if (!realname || !mobile) {
        formatErrorMessage(res, '员工名称或电话不能为空')
        return
      }
      let findOneUser = await homemakingUser.find({ $or: [{ realname: realname }, { mobile: mobile }] });
      if (findOneUser.length > 0) {
        res.send({
          result: 0,
          data: [],
          msg: '已存在该员工名称或电话',
        })
        return
      }
      const homemaking_id = Number(await getIdmethod.getId('homemaking_id'));
      console.log(req.session.user, 'req.session.user')
      let newAdmin = {
        realname: realname,
        uid: homemaking_id,
        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
        avatar: avatar ? avatar : "photo-mr.jpg",
        mobile: mobile,
        workTime: workTime,
        creatUid: req.session.user.uid
      }
      let userList = await homemakingUser.create(newAdmin);
      res.send({
        result: 1,
        data: userList,
        msg: '添加家政人员成功',
      })
    } catch (error) {
      console.log(error, 'dddddddddddddddddd')
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  }
}

// 格式化错误信息
function formatErrorMessage(res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || '',
  });
}
module.exports = new homemaking();