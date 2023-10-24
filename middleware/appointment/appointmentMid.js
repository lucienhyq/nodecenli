const logger = require("../../logs/logs").logger;
const appointmentModel = require("../../models/course/appointment");
const dtime = require("time-formater");
const courseModel = require("../../models/course/course");

class appiontment {
  async appiontment_add(req, res, next) {}
  async appiontment_record(req, res, next) {
    // console.log(req,res)
    // logger.info(":::::::::::::::appiontment_record", req.body);
    let good = await courseModel.findOne({ id: req.body.courseId });
    let record = await appointmentModel.findOne({
      memberId: req.body.memberId,
      appointmentDay: dtime().format("YYYY-MM-DD"),
    });
    logger.info(":::::::::::::::appiontment_record是否有记录", record);
    logger.info(":::::::::::::::good是否有课程商品", good);
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
    // .then((response) => {
    //   logger.info(":::::::::::::::appiontment_record", response);
    //   // console.log(response);
    //   if (response.length > 0) {
    //     next();
    //   } else {

    //   }
    // });
  }
}

module.exports = new appiontment();
