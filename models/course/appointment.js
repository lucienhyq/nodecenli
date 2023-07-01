var mongoose = require('mongoose');
const db = require('../../db')
const Schema = mongoose.Schema;
const appointmentSchema = new Schema({
  // 签到id
  id: {
    type: Number
  },
  // 签到时间戳
  appointmentTime: {
    type: String
  },
  // 签到日期
  appointmentDay: String,
  // 签到人姓名
  userName: String,
  // 手机号码
  mobile: String,
  // 签到的课程id
  courseId: String,
  // 预约会员id
  memberId: Number,
  // 使用状态： 0未到场，1已到场
  status: {
    type: Number,
    default: 0
  }
})

appointmentSchema.index({ id: 1 });

const appointment = db.model('appointment', appointmentSchema);


module.exports = appointment