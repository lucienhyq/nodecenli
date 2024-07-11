var mongoose = require("mongoose");
const db = require("../../db");

const idsSchema = new mongoose.Schema({
  restaurant_id: Number,
  food_id: Number,
  order_id: Number,
  user_id: Number,
  address_id: Number,
  cart_id: Number,
  img_id: Number,
  category_id: Number,
  item_id: Number,
  sku_id: Number,
  admin_id: Number,
  statis_id: Number,
  goods_id: Number,
  article_id: Number,
  homemaking_id: Number,
  musicScoreForm_id: Number,
  musicScoreForm_record_id: Number,
  cardRecord_id: Number,
});

const Ids = db.model("Ids", idsSchema);

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      restaurant_id: 0,
      food_id: 0,
      order_id: 0,
      user_id: 0,
      address_id: 0,
      cart_id: 0,
      img_id: 0,
      category_id: 0,
      item_id: 0,
      sku_id: 0,
      admin_id: 0,
      statis_id: 0,
      goods_id: 0,
      article_id: 0,
      homemaking_id: 0,
      musicScoreForm_id: 0,
      musicScoreForm_record_id: 0,
      cardRecord_id:0
    });
    newIds.save();
  }
});
// export default Ids
module.exports = Ids;
