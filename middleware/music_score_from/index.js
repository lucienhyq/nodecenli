const logger = require("../../logs/logs").logger;
const fromModel = require("../../models/music_score_from_models/index");
const Admin = require("../../models/admin/admin");
const getIdmethod = require("../../prototype/ids");
class from_controller {
  createAGradeForm = async (req, res, next) => {
    try {
      let conten = req.body;
      console.log(req.body.contenObj, conten, "dddddddddddd");
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
      res.send({ body: req.body });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  formatErrorMessage = (res, message) => {
    res.status(500).send({
      error: true,
      message: message || "",
    });
  };
  pageNum = 15;
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
  findFormId = async (req, res, next) => {
    try {
      console.log("req.query.id", req.query.id);
      let find = await fromModel.findOne({ id: req.query.id });
      res.status(200).send({
        data: find,
        result: 1,
        msg: "",
      });
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
  updateForm = async (req, res, next) => {
    try {
    } catch (error) {
      logger.error("error:::::", error);
    }
  };
}

module.exports = new from_controller();
