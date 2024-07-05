const Admin = require("../../models/admin/admin");
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
  index = async (req, res, next) => {
    let adminList = await Admin.findOne({ id: card_controller.shareUid });
    res.send({
      result: 1,
      data: {
        business: card_controller.main_business,
        admin: adminList,
        development_history: card_controller.development_history,
      },
      msg: "获取成功",
    });
  };
}
module.exports = new card_controller();
