const courseModel = require("../../models/course/course");
const appointmentModel = require("../../models/course/appointment");
const appiontmentSignCode = async (req, res, next) => {
  let appointmentArr_ID = await appointmentModel.findOne({ id: req.body.course_id });
  let arr = await courseModel.findOne({ id: Number(appointmentArr_ID.course_id) });
  let json = {};
  console.log(req.body,req.body.img)
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
    data:json
  });
}

module.exports = appiontmentSignCode;