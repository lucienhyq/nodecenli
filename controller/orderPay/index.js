const courseModel = require("../../models/course/course");
const orderModel = require("../../models/order/order");
const homemakingUser = require("../../models/homemaking/homemakingUser");
const logger = require("../../logs/logs").logger;
const getIdmethod = require("../../prototype/ids");
const dtime = require("time-formater");
const admin = require("../../models/admin/admin");
// const order = require('../../models/order/order');

class orderController {
  // course 课程商品创建地点
  async coursePay(req, res, next) {
    try {
      let curseId = req.body.id;
      let orderList;
      let uid = req.session.user.id;
      let list = await courseModel.find({ id: curseId });

      // 时间戳生成得订单流水号
      let randomSn = createordernum();
      if (list.length <= 0 && list[0].id != curseId) {
        throw new Error("购买失败，请检查商品是否存在");
      }
      let checkSn = await orderModel.find({ orderSn: randomSn });
      if (checkSn.length > 0) {
        throw new Error("购买失败，请重新下单");
      }
      let json = {
        orderId: await getIdmethod.getId("order_id"),
        goodsId: list[0].id,
        create_time: dtime().format("YYYY-MM-DD HH:mm:ss"),
        course_price: list[0].course_price,
        orderSn: randomSn,
        orderType: "course",
        goodTitle: list[0].title,
        goodImg: list[0].goodimg,
      };
      const adminResult = await admin.findOne({ id: uid });
      if (adminResult) {
        json.numberId = adminResult._id;
      }

      orderList = await orderModel.create(json);
      res.send({
        result: 1,
        msg: "成功",
        data: orderList,
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error(error);
    }
  }
  async testUpdateHmOrder(req, res, next) {
    try {
      // 更新所有文档，将新字段添加为默认值
      const updateResult = await orderModel.updateMany(
        {},
        { $set: { Hmid: "" } }
      );
      console.log(`已成功添加默认字段到 ${updateResult.nModified} 个文档`);
    } catch (error) {
      console.error("添加默认字段失败", error);
    }
  }
  // 家政服务下单，免费下单，私下付款
  async homeMakingOrder(req, res, next) {
    try {
      let hmuid = req.body.hmuid;
      let orderList;
      let uid = req.user._id;
      if (!hmuid) {
        formatErrorMessage(res, "请输入正确的家政人员id");
        return;
      }
      if (!req.body.startTime || !req.body.endTime) {
        // 预约时间
        formatErrorMessage(res, "请选择预约的时间");
        return;
      }
      let list = await homemakingUser
        .findOne({ hmuid: hmuid })
        .populate("creatUid");
      if (list.creatUid.id == req.user.uid) {
        formatErrorMessage(res, "不能预约自己");
        return;
      }
      if (!list.status) {
        formatErrorMessage(res, "该家政人员未通过审核");
        return;
      }

      let fitt = {
        Hmid: list.creatUid._id, // 检查特定的Hmid
        $or: [
          {
            $and: [
              { startTime: { $lt: req.body.startTime } }, // 检查现有startTime是否在新startTime之前
              { endTime: { $lte: req.body.startTime } } // 检查现有endTime是否在新startTime之前或相等
            ]
          },
          {
            $and: [
              { startTime: { $gte: req.body.endTime } }, // 检查现有startTime是否在新endTime之后或相等
              { endTime: { $gt: req.body.endTime } } // 检查现有endTime是否在新endTime之后
            ]
          }
        ]
      };
      let checkSn = await orderModel.find(fitt);
      console.log(checkSn);
      if (checkSn.length > 0) {
        res.send({
          result: 0,
          msg: "该时间段已经被预约",
          data: checkSn,
        });
        return;
      }
      // // 时间戳生成得订单流水号
      let randomSn = createordernum();
      let json = {
        orderId: await getIdmethod.getId("order_id"),
        create_time: dtime().format("YYYY-MM-DD HH:mm:ss"),
        price: list.price,
        orderSn: randomSn,
        orderType: "homeaking",
        Hmid: list.creatUid._id,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      };
      const adminResult = await admin.findOne({ id: req.user.uid });
      if (adminResult) {
        json.numberId = adminResult._id;
      }
      // orderList = await orderModel.create(json);
      res.send({
        result: 1,
        msg: "成功",
        // data: orderList,
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error(error);
    }
  }
  async orderCountList(req, res, next) {
    try {
      let user = await admin.findOne({ id: req.session.user.id });
      console.log(user, "dddddddd");
      let page = 0;
      let total = 4;
      if (req.body.page) {
        page = req.body.page - 1;
      }
      let order = await orderModel
        .find()
        .select("-_id -__v")
        .populate(
          "numberId crouse_id Hmid",
          "-_id user_name avatar mobile id realname"
        )
        .limit(total)
        .sort({ orderId: -1 })
        .skip(page * total);
      res.send({
        data: order,
        msg: "successs",
        result: 1,
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error(error);
    }
  }
}
const formatErrorMessage = function (res, message) {
  res.status(500).send({
    data: "error",
    result: 0,
    msg: message || "",
  });
};
const createordernum = function () {
  const now = new Date();
  let month = now.getMonth() + 1;
  let day = now.getDate();
  let hour = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();
  month = setTimeDateFmt(month);
  day = setTimeDateFmt(day);
  hour = setTimeDateFmt(hour);
  minutes = setTimeDateFmt(minutes);
  seconds = setTimeDateFmt(seconds);
  let orderCode =
    "hm" +
    now.getFullYear().toString() +
    month.toString() +
    day +
    hour +
    minutes +
    seconds +
    Math.round(Math.random() * 1000000).toString();
  return orderCode;
  //基于年月日时分秒+随机数生成订单编号
};
const setTimeDateFmt = function (s) {
  // 个位数补齐十位数
  return s < 10 ? "0" + s : s;
};
module.exports = new orderController();
