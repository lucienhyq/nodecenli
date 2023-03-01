var mongoose = require('mongoose');
const db = require('../../db')
const Schema = mongoose.Schema;
const courseSchema = new Schema({
  // 课程名称
  title: String,
  // 商品价格
  course_price: Number,
  // 商品id
  id: {
    type: Number,
    unique: true,
    default: 1
  },
  // 创建时间
  create_time: String,
  // 商品详情
  conten: String,
  // 商品是否上架
  shelfStatus: Number,
  // 商品图片
  goodimg: {
    type: String,
  },
  // 库存
  inventory: Number,
  // 商品类型：1：普通商品，2：预约商品
  goodStatus:String
})
courseSchema.index({ id: 1 });

const course = db.model('course', courseSchema);


module.exports = course