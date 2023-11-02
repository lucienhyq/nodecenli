const dtime = require('time-formater');
const getIdmethod = require('../../prototype/ids');
const courseModel = require('../../models/course/course');
const logger = require('../../logs/logs').logger;

class Course {
  async addCourse(req, res, next) {
    try {
      let gid = await getIdmethod.getId('goods_id');
      let info = req.body.form;
      logger.info(req.body, 'addCourse');
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
      };
      await courseModel.create(json);
      let list = await courseModel.find({}).sort({ goods_id: -1 });
      res.send({
        result: 1,
        data: list,
        msg: '发布成功',
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error:::::', error);
    }
  }

  async course_Delete(req, res, next) {
    try {
      let good_id = req.query.goods_id;
      logger.info(good_id, 'good_id');
      const result = await courseModel.deleteOne({ id: good_id });
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

  async courseList(req, res, next) {
    try {
      let list, json;
      json = { shelfStatus: true };
      if (req.body.id) {
        json.id = req.body.id;
      }

      list = await courseModel.find(json);
      const total = await courseModel.countDocuments({});
      res.send({
        result: 1,
        msg: '已经登录',
        data: {
          list,
          total,
        }
      });

    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  }

  async courseLisUpdate(req, res, next) {
    try {
      let good_id = req.body.id;
      let json = {};
      let form = req.body.form;
      if (!good_id) {
        formatErrorMessage(res, '没有该商品');
        return;
      }
      let list = await courseModel.find({ id: good_id });
      if (list.length == 0) {
        formatErrorMessage(res, '没有该商品');
        return;
      }
      if (form) {
        // 修改上架状态
        if (form.shelfStatus == '1') {
          json.shelfStatus = true;
        } else if (form.shelfStatus == '2') {
          json.shelfStatus = false;
        }
        if (form.goodStatus) {
          json.goodStatus = form.goodStatus;
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
          json.title = String(form.title);
        }
      }
      logger.info(form, 'dwwwwwww', json);
      await courseModel.updateOne({ 'id': good_id }, json);
      res.send({
        result: 1,
        msg: '修改成功',
      });
    } catch (error) {
      formatErrorMessage(res, error);
      logger.error('error' + error);
    }
  }
}

function formatErrorMessage(res, message) {
  res.status(500).send({
    "error": true,
    "message": message || '',
  });
}

module.exports = new Course();