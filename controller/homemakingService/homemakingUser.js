const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const homemakingUser = require('../../models/homemaking/homemakingUser');
const admin = require('../../models/admin/admin');
const logger = require('../../logs/logs').logger;

class homemaking {
  async homemakingList(req, res, next) {
    try {
      if (req.body.hmuid) {
        homemakingUser.findOne({ hmuid: req.body.hmuid })
          .select('-_id -__v')
          .populate('creatUid', '-_id user_name avatar mobile id')
          .exec((err, list) => {
            if (err) {
              logger.info('homemakingList::::::err', err)
            }
            res.send({
              data: list,
              result: 1,
              msg: '成功'
            });
          });
      } else {
        homemakingUser.find()
          .select('-_id -__v')
          .populate('creatUid', '-_id user_name avatar mobile id')
          .exec((err, list) => {
            if (err) {
              logger.info('homemakingList::::::err', err)
            }
            res.send({
              data: list,
              result: 1,
              msg: '成功'
            });
          });
      }

    } catch (error) {
      console.log(error)
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
      let newAdmin = {
        realname: realname,
        hmuid: homemaking_id,
        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
        avatar: avatar ? avatar : "photo-mr.jpg",
        mobile: mobile,
        workTime: workTime,
      }
      try {
        const adminResult = await admin.findOne({ id: req.session.user.id });
        if (adminResult) {
          newAdmin.creatUid = adminResult._id;
        }
        let userList = await homemakingUser.create(newAdmin);
        res.send({
          result: 1,
          data: userList,
          msg: '添加家政人员成功',
        })
      } catch (error) {
        console.log(error, '其他错误');
        logger.info('MongoServerError', error)
        // 处理其他错误
      }
    } catch (error) {
      formatErrorMessage(res, error);
    }
  }
  // 更新在职状态
  async updateWorkStatus(req, res, next) {
    try {
      if (!req.body.hmuid) {
        formatErrorMessage(res, '输入正确的家政职工id')
      }
      let json = {
        hmuid: req.body.hmuid,
      }
      if (req.body.realname) {
        json.realname = req.body.realname
      }
      if (req.body.avatar) {
        json.avatar = req.body.avatar
      }
      if (req.body.mobile) {
        json.mobile = req.body.mobile
      }
      if (req.body.workTime) {
        json.workTime = req.body.workTime
      }
      if (req.body.clientShow) {
        json.clientShow = req.body.clientShow
      }

      try {
        await homemakingUser.updateOne({ 'hmuid': req.body.hmuid }, json);
        res.send({
          result: 1,
          msg: '修改成功',
        });
      } catch (error) {
        formatErrorMessage(res, error);
      }
    } catch (error) {
      formatErrorMessage(res, error);
    }
  }
  async homework_delete(req, res, next) {
    try {
      let humid = req.query.hmuid;
      const result = await homemakingUser.deleteOne({ id: humid });
      if (result.deletedCount > 0) {
        logger.info(result, '删除成功');
        res.send({
          result: 1,
          msg: '删除成功'
        });
      } else {
        logger.info(result, '删除失败');
        res.send({
          result: 0,
          msg: '删除失败'
        });
      }
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  }
}

// 格式化错误信息
function formatErrorMessage(res, message) {
  logger.error('error:', message);
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || '',
  });
}
module.exports = new homemaking();