const logger = require("../../logs/logs").logger;
const fromModel = require("../../models/music_score_from_models/index");
const Admin = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");
class from_controller {
  formatErrorMessage = (res, message) => {
    res.status(500).send({
      error: true,
      message: message || "",
    });
  };
  // 分页显示数量
  pageNum = 15;

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
        res.send({
          msg: "请输入表单标题",
        });
        return;
      }
      let json = {
        creatUid: req.user._id,
        FormContent: conten.contenObj,
        id: conten.id,
        formName: conten.title,
        formImg: conten.formImg,
        formDesc: conten.formDesc,
      };
      await fromModel.updateOne({ id: conten.id }, json);
      res.send({ data: conten.id, msg: "成功", result: 1 });
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
      };
      console.log(json);
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
      res.status(200).send({
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
  findFormId = async (req, res, next) => {
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
}

module.exports = new from_controller();
