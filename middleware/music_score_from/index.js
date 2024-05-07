const logger = require("../../logs/logs").logger;
const fromModel = require("../../models/music_score_from_models/index");
const music_score_record = require("../../models/music_score_from_models/record");
const Admin = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");

function formatErrorMessage(res, message) {
  res.status(500).send({
    error: true,
    message: message || "",
    data: [],
  });
}
class from_controller {
  constructor() {
    // 分页显示数量
    this.pageNum = 15;
  }

  // 更新指定表单
  /**
   *
   * @param {
   *  user 通过findUid中间件传递
   * } req
   * @param {*} res
   * @param {*} next
   */
  updateForm = async (req, res, next) => {
    try {
      let conten = req.body;
      console.log(conten);
      if (!conten.title) {
        logger.error("error:::::", req.body);
        return res.send({
          result: 0,
          msg: "请输入表单标题",
        });
      }
      let json = {
        creatUid: req.user._id,
        FormContent: conten.contenObj,
        id: conten.id,
        formName: conten.title,
        formImg: conten.formImg,
        formDesc: conten.formDesc,
        isMusicForm: conten.checked,
      };
      await fromModel.updateOne({ id: conten.id }, json);
      return res.send({ data: conten.id, msg: "成功", result: 1 });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  delForm = async (req, res, next) => {
    try {
      let result = fromModel.deleteOne({ id: req.body.id });
      console.log(result.deletedCount);
      if (result.deletedCount > 0) {
        logger.info(req.user, result, "删除成功", req.body.id);
        res.send({
          result: 1,
          msg: "删除成功",
        });
      } else {
        logger.info(req.user, result, "删除失败", req.body.id);
        res.send({
          result: 0,
          msg: "删除失败",
        });
      }
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 创建表单
  createAGradeForm = async (req, res, next) => {
    try {
      let conten = req.body;
      if (!conten.title) {
        logger.error("error:::::", req.body);
        res.send({
          result: 0,
          msg: "请输入表单标题",
        });
        return;
      }
      let musicScoreForm_id = await getIdmethod.getId("musicScoreForm_id");
      let json = {
        creatUid: req.user._id,
        FormContent: conten.contenObj,
        id: musicScoreForm_id,
        formName: conten.title,
        formImg: conten.formImg,
        formDesc: conten.formDesc,
        isMusicForm: conten.checked,
      };
      fromModel.create(json);
      res.send({ data: musicScoreForm_id, msg: "创建成功", result: 1 });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 获取表单列表
  getGradeFormList = async (req, res, next) => {
    try {
      let page = req.body.page ? req.body.page : 1;
      let countNumber = await fromModel.find({}).count();
      let list = await fromModel
        .find({})
        .limit(this.pageNum)
        .skip(page <= 1 ? 0 : this.pageNum * page)
        .populate("creatUid")
        .sort({ id: -1 });
      return res.status(200).send({
        data: list,
        total: countNumber,
        page: page,
      });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 查找登录人信息
  findUid = async (req, res, next) => {
    try {
      let { uid } = req.user;
      let adminList = await Admin.findOne({ id: uid });
      req.user._id = adminList._id;
      next();
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 通过表单id查指定表单
  findFormId_list = async (req, res, next) => {
    try {
      console.log("req.query.id", req.query.id);
      let find = await fromModel
        .findOne({ id: req.query.id })
        .populate("creatUid", "-_id id")
        .select("-_id -__v");
      res.status(200).send({
        data: find,
        result: 1,
        msg: "",
      });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 查找表单ObjectId
  findFormId = async (req, res, next) => {
    try {
      if (!req.body.form_id) {
        formatErrorMessage(res, "请传入表单id");
        return;
      }
      let find = await fromModel.findOne({ id: req.body.form_id });
      if (!find) {
        return formatErrorMessage(res, "表单不存在");
      }
      req.form = {};
      req.form.form_id = find._id;
      req.form.id = find.id;
      next();
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  // 表单填写记录提交
  musicFormRecord = async (req, res, next) => {
    try {
      let { form_id, id } = req.form;
      let { _id } = req.user;
      if (!req.body.province || !req.body.city) {
        formatErrorMessage(res, "请选择赛区");
        return;
      }
      let userform = await music_score_record.find({ member: _id }).count();
      let record_id = await getIdmethod.getId("musicScoreForm_record_id");
      // console.log(userform, "是否已经报过名");
      if (userform >= 1) {
        res.status(200).send({
          msg: "已经填写过该表单",
          data: [],
          result: 0,
        });
        return;
      }
      if (!record_id) {
        res.status(200).send({
          msg: "不存在表单",
          data: [],
          result: 0,
        });
        return;
      }
      let json = {
        id: record_id,
        DivisionProvince: req.body.province,
        DivisionCity: req.body.city,
        FormContent: req.body.FormContent,
        member: _id,
        musicScore: form_id,
        form_id: id,
      };
      let record = music_score_record.create(json);
      res.status(200).send({
        msg: "成功",
        data: record,
        result: 1,
      });
    } catch (error) {
      logger.error("error:::::", error);
      formatErrorMessage(res, error);
    }
  };
  musicFormRecord_list = async (req, res, next) => {
    try {
      let countNumber = await music_score_record.find({}).count();
      let list = await music_score_record.find({}).limit(this.pageNum);
      console.log(list);
      res.send({
        data: list,
        total: countNumber,
        result: 1,
        msg: "成功",
      });
    } catch (error) {
      logger.error("error:::::", error);
      formatErrorMessage(res, error);
    }
  };
}

module.exports = new from_controller();
