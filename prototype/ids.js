const Ids = require('../models/utils/ids')
const idList = ['restaurant_id', 'food_id', 'order_id', 'user_id', 'address_id', 'cart_id', 'img_id', 'category_id', 'item_id', 'sku_id', 'admin_id', 'statis_id'];
var getId = async function (type) {
  if (!idList.includes(type)) {
    console.log('id类型错误');
    throw new Error('id类型错误');
    return
  }
  try {
    const idData = await Ids.findOne();
    idData[type]++;
    await idData.save();
    return idData[type]
  } catch (err) {
    console.log('获取ID数据失败');
    throw new Error(err)
  }
}

module.exports = {
  getId
}