const logger = require("../../logs/logs").logger;
const dtime = require("time-formater");
const appointmentModel = require("../../models/course/appointment");
const courseModel = require("../../models/course/course");
const adminModel = require("../../models/admin/admin");

class appiontment {
  // 预约
  async appiontment_add(req, res, next) {
    try {
      let list;
      logger.info(":::::::::::::::appiontment_add", req.session);
      if (!req.body.mobile) {
        res.send({
          msg: '请输入预约手机号码',
          result: 0
        })
        return
      }
      let user = req.session.user;
      let good = await courseModel.find({ id: req.body.courseId });
      if (good.length <= 0) throw new Error('预约商品不存在');
      if (good[0].goodStatus != 2) throw new Error('不是预约商品');
      let len = await appointmentModel.find({}).sort({ id: -1 });
      let json = {
        id: len.length == 0 ? 1 : Number(len[0].id) + 1,
        appointmentTime: Date.now(),
        appointmentDay: dtime().format('YYYY-MM-DD'),
        userName: user.userName,
        mobile: req.body.mobile,
        courseId: req.body.courseId,
        memberId: user.id
      }
      // 验证当前是否签到
      list = await appointmentModel.create(json);
      await adminModel.updateOne({ 'id': user.id }, { mobile: json.mobile }).then((data) => {
        // 取当前预约手机设置成会员手机
        logger.info(":::::::::::::::appiontment_add取当前预约手机设置成会员手机", data);
      }).catch((err) => {
        logger.error(":::::::::::::::appiontment_add取当前预约手机设置成会员手机更新失败", err);
      })
      res.send({
        result: 1,
        data: list,
        msg: '签到成功',
      })
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  };
  // 查看是否预约此商品
  async appiontment_record(req, res, next) {
    // console.log(req,res)
    let good = await courseModel.findOne({ id: req.body.courseId });
    let record = await appointmentModel.findOne({
      memberId: req.session.user.id,
      appointmentDay: dtime().format("YYYY-MM-DD"),
    });
    logger.info(":::::::::::::::appiontment_record是否有记录", record, dtime().format("YYYY-MM-DD"), req.session.user.id);
    logger.info(":::::::::::::::good是否有课程商品", good);
    if (good.goodStatus != "2") {
      res.send({
        msg: "该商品不能预约",
        result: 0,
      })
    } else {
      if (record) {
        res.send({
          msg: "已经报名",
          result: 0,
        });
      } else if (!good) {
        res.send({
          msg: "没有该商品",
          result: 0,
        });
      } else if (good && !record) {
        next();
      }
    }

  };
  async appiontmentSignCode(req, res, next) {
    let appointmentArr_ID = await appointmentModel.findOne({ id: req.body.course_id });
    logger.info(":::::::::::::::appointmentArr_ID", appointmentArr_ID);
    let arr = await courseModel.findOne({ id: Number(appointmentArr_ID.id) });
    let json = {};
    console.log(req.body, req.body.img)
    if (req.body.img) {
      json.img = req.body.img;
    }
    if (req.body.id) {
      json.course = arr;
      json.appointment = appointmentArr_ID;
    }
    res.send({
      result: 1,
      msg: '获取成功',
      data: json
    });
  };
  async appointmentRecord(req, res, next) {
    try {
      let list;
      // 每页显示15条数据
      let pageSize = 15;
      let page = req.body.page;
      if (!req.body.page) {
        page = 1
      }
      let nowPageNum = ((page - 1) * pageSize);
      let total = 0;
      let currentData;
      let json = { id: { $exists: true } }
      if (req.body.memberId) {
        json.memberId = req.body.memberId;
      }
      if (req.body.currentData) {
        currentData = dtime(Number(req.body.currentData)).format('YYYY-MM-DD');
        json.appointmentDay = currentData;
      }
      await appointmentModel.find(json).skip(nowPageNum).limit(pageSize).sort({ id: -1 }).then((data) => {
        list = data;
        total = data.length;
      });
      if (list.length <= 0) {
        res.send({
          result: 0,
          msg: '暂无数据',
        })
      } else {
        res.send({
          result: 1,
          msg: '成功',
          list: {
            data: list,
            total,
            current_page: page
          }
        })
      }

    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('appointmentRecord——error' + error);
    }
  }
  async appointmentSingIn(req, res, next) {
    try {
      if (!req.body.good_id) {
        throw new Error('预约不存在')
      }
      res.send({
        result: 0,
        msg: null,
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('appointmentSingIn——error' + error);
    }
  }
  async get_appointment(req, res, next) {
    try {
      let appointmentArr = await appointmentModel.findOne({ id: req.body.appointment_id });
      let courseArr = await courseModel.findOne({ id: appointmentArr.courseId });
      let admin = await adminModel.findOne({ id: appointmentArr.memberId })
      logger.info(":::::::::::::::appointmentArr+courseArr", appointmentArr, courseArr, admin);
      let { appointmentTime, mobile, status } = appointmentArr;
      let { title, id, goodStatus } = courseArr;
      let { user_name, avatar } = admin
      res.send({
        data: {
          appointmentTime, mobile, status,
          course_goodId: id,
          title,
          goodStatus,
          member: {
            uid: admin.id,
            user_name,
            avatar
          }
        },
        msg: '成功',
        result: 1
      })
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('appointmentSingIn——error' + error);
    }
  }
};

// 格式化错误信息
function formatErrorMessage(res, message,) {
  res.status(500).send({
    "data": "error",
    "result": 0,
    "msg": String(message),
  });
}
module.exports = new appiontment();
