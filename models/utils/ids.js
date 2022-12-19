
var mongoose = require('mongoose')
const db = require('../../db')

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
});

const Ids = db.model('Ids', idsSchema);

Ids.findOne((err, data) => {
  if (!data) {
    const newIds = new Ids({
      restaurant_id: 0,
      admin_id: 0,
      statis_id: 0,
    });
    newIds.save();
  }
})
// export default Ids
module.exports = Ids