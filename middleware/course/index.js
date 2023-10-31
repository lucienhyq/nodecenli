const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;

class course {
  addCourse = async (req, res, next) => {
    try {
      let gid = await getIdmethod.getId('goods_id');
      let info = req.body.form;
      logger.info(req.body, 'addCourse')
      let json = {
        id: gid,
        title: info.title,
        course_price: Number(info.course_price),
        create_time: dtime().format('YYYY-MM-DD HH:mm:ss'),
        conten: info.conten,
        shelfStatus: info.shelfStatus == 'true' || info.shelfStatus ? true : false,
        goodimg: info.goodimg,
        inventory: Number(info.inventory),
        goodStatus: info.goodStatus
      }
      await courseModel.create(json)
      let list = await courseModel.find({}).sort({ goods_id: -1 });
      res.send({
        result: 1,
        data: list,
        msg: '发布成功',
      })
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error:::::', error);
    }
  };
  course_Delete = async (req, res, next) => {
    try {
      let good_id = req.query.goods_id;
      logger.info(good_id, 'good_id')
      courseModel.deleteOne({ id: good_id }).then((result) => {
        logger.info(result, '删除成功')
        res.send({
          result: 1,
          msg: '删除成功'
        })
      }).catch((error) => {
        logger.info(error, '删除失败')
        res.send({
          result: 0,
          msg: '删除失败'
        })
      })

    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  };
  courseList = async (req, res, next) => {
    try {
      let list, json;
      json = { shelfStatus: true };
      if (req.body.id) {
        json.id = req.body.id;
      }
      list = await courseModel.find(json);
      res.send({
        result: 1,
        msg: '已经登录',
        data: {
          list,
          total: await courseModel.find({}).count(),
        }
      })
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  };
  courseLisUpdate = async (req, res, next) => {
    try {
      let list;
      let good_id = req.body.id;
      let json = {};
      let form = req.body.form;
      if (good_id) {
        list = await courseModel.find({ id: good_id });
        if (list.length == 0) {
          formatErrorMessage(res, '没有该商品')
          return
        }
      } else {
        formatErrorMessage(res, '没有该商品')
        return
      }
      if (form) {
        // 修改上架状态
        if (form.shelfStatus == '1') {
          json.shelfStatus = true;
        } else if (form.shelfStatus == '2') {
          json.shelfStatus = false;
        }
        if (form.goodStatus) {
          json.goodStatus = form.goodStatus
        }
        // 修改价格
        if (form.course_price) {
          json.course_price = Number(form.course_price);
        }
        // 修改详情
        if (form.conten) {
          json.conten = form.conten;
        }
        // 修改图片
        if (form.goodimg) {
          json.goodimg = form.goodimg;
        }
        // 修改库存
        if (form.inventory) {
          json.inventory = Number(form.inventory);
        }
        if (form.title) {
          json.title = String(form.title)
        }
      }
      logger.info(form, 'dwwwwwww', json)
      await courseModel.updateOne({ 'id': good_id }, json).then((data) => {
        res.send({
          result: 1,
          msg: '修改成功',
        })
      }).catch((err) => {
        res.send({ err: -1, msg: err._message, data: null })
      })
    } catch (error) {
      formatErrorMessage(res, error);
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


module.exports = new course();