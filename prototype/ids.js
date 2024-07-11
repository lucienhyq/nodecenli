const Ids = require("../models/utils/ids");
const idList = [
  "homemaking_id",
  "article_id",
  "goods_id",
  "restaurant_id",
  "food_id",
  "order_id",
  "user_id",
  "address_id",
  "cart_id",
  "img_id",
  "category_id",
  "item_id",
  "sku_id",
  "admin_id",
  "statis_id",
  "musicScoreForm_id",
  "musicScoreForm_record_id",
  "cardRecord_id"
];
var getId = async function (type) {
  if (!idList.includes(type)) {
    console.log("id类型错误");
    throw new Error("id类型错误");
  }
  try {
    const idData = await Ids.findOne();
    idData[type]++;
    await idData.save();
    return idData[type];
  } catch (err) {
    // 如果有新增id字段就更新文档
    let findobj = await Ids.findOne();
    console.log(findobj);
    if (findobj && !findobj.hasOwnProperty(type)) {
      findobj[type] = 1;
      await Ids.findOneAndUpdate(findobj);
      let idDataE = await Ids.findOne();
      return idDataE[type];
    } else {
      console.log("获取ID数据失败");
      throw new Error(err);
    }
  }
};
var setId = async function (type) {
  let findobj = await Ids.findOne();
  console.log(findobj[type]);
  findobj.article_id = 0;
  console.log(findobj);
  await Ids.updateOne({ _v: 0 }, findobj);
};

module.exports = {
  getId,
  setId,
};
