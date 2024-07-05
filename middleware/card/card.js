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
  constructor() {
  }
  index = async (req, res, next) => {
    let adminList = await Admin.findOne({ id: card_controller.shareUid });
    res.send({
      result: 1,
      data: {
        business: card_controller.main_business,
        admin: adminList,
      },
      message: "获取成功",
    });
  };
}
module.exports = new card_controller();
