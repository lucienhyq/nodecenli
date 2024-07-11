const Admin = require("../../models/admin/admin");
const cardSettiing = require("../../models/card_business/setting");
class card_controller {
  static is_admin = false;
  static main_business = [
    {
      text: "公司注册",
      icon: "icon-gongsizhuce1",
    },
    {
      text: "代理记账",
      icon: "icon-dailijizhang",
    },
    {
      text: "出口退税",
      icon: "icon-chukoutuishui",
    },
    {
      text: "工商变更",
      icon: "icon-SAAS-gongshangfuwu",
    },
    {
      text: "税务筹划",
      icon: "icon-zengzhishuishenbaonashuishiyongyuxiaoguimonashuiren",
    },
    {
      text: "高新企业",
      icon: "icon-guojiagaoxinqiye",
    },
    {
      text: "一般纳税人",
      icon: "icon-shuiwuguanlixitong",
    },
    {
      text: "香港公司",
      icon: "icon-xianggang",
    },
    {
      text: "知识产权",
      icon: "icon-zhishichanquan",
    },
    {
      text: "法律服务",
      icon: "icon-falvfuwu",
    },
    {
      text: "地址挂靠",
      icon: "icon-dizhi",
    },
    {
      text: "各类资质代办",
      icon: "icon-zizhidaiban",
    },
  ];
  static min_program_nav = ["首页", "工商", "代理记账", "知识产权"];
  static shareUid = 50;
  static development_history = [
    {
      date: "2010",
      desc: "公司成立",
    },
    {
      date: "2011",
      desc: "转型互联网营销",
    },
    {
      date: "2012",
      desc: "办公面积300方",
    },
    {
      date: "2013",
      desc: "团队外出参加运营管理培训课程",
    },
    {
      date: "2014",
      desc: "整合行业资源，参与创建广州市财务代理行业协会",
    },
    {
      date: "2015",
      desc: "开始组建多元企服产品生态链",
    },
    {
      date: "2016",
      desc: `荣获"广东省守合同重信用企业单位"`,
    },
  ];
  constructor() {}
  cardCheckShare = async (req, res, next) => {
    try {
      let shareUid;
      if (req.body.mid || req.query.mid) {
        // 有分享人的id
        shareUid = req.body.mid || req.query.mid;
        let user = await Admin.findOne({ id: shareUid }).select(
          "-_id user_name"
        );
        return { shareMember: user };
      }
      return false;
    } catch (error) {
      return false;
    }
  };
  card_Index = async (req, res, next) => {
    let Setting_result = await cardSettiing.findOne().select("-_id -__v");
    let cardCheckShare_result = await this.cardCheckShare(req, res, next);
    let json = {
      data: Setting_result,
    };
    if (cardCheckShare_result) {
      json.shareFromMember = cardCheckShare_result.shareMember;
    }
    res.send({
      result: 1,
      data: json,
      msg: "获取成功",
    });
  };
  card_setting_save = async (req, res, next) => {
    try {
      let {
        company_name,
        company_address,
        company_desc,
        development_history,
        main_business,
        shareUid,
      } = req.body;
      let findSetting = await cardSettiing.find();
      if (
        !company_name ||
        !company_address ||
        !development_history ||
        !main_business
      ) {
        res.status(200).send({
          result: 0,
          data: [],
          msg: "参数错误",
        });
        return;
      }
      if (findSetting.length == 0) {
        // 创建
        let saveSetting = await cardSettiing.create({
          company_name,
          company_address,
          company_desc,
          development_history: card_controller.development_history,
          main_business: card_controller.main_business,
          shareUid,
        });
      } else {
        // 更新
        let updateSetting = await cardSettiing.updateOne(
          { _id: findSetting[0]._id },
          {
            company_name,
            company_address,
            company_desc,
            development_history,
            main_business,
            shareUid,
          }
        );
        console.log("qqqqqqqqqqqqqq", company_desc);
      }
      let Setting_result = await cardSettiing.findOne();
      res.status(200).send({
        result: 1,
        data: Setting_result,
        msg: "成功",
      });
    } catch (error) {
      res.status(200).send({
        result: 0,
        data: error,
        msg: "失败",
      });
    }
  };
}
module.exports = new card_controller();
