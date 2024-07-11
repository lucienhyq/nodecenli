var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;
const getIdmethod = require("../../prototype/ids");

const cardBussinessSchema = new Schema(
  {
    // 从哪个用户分享进入的记录表
    shareFromUid: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    memberUid: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    id: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
cardBussinessSchema.pre("save", async function (next) {
  if (!this.id) {
    this.id = await getIdmethod.getId("cardRecord_id");
  }
});
const cardBussiness = db.model("cardBussiness", cardBussinessSchema);

module.exports = cardBussiness;
