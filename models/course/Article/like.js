var mongoose = require("mongoose");
const db = require("../../../db");
const Schema = mongoose.Schema;
const likeSchema = new Schema({
  article: { type: Schema.Types.ObjectId, ref: "Article", field: "_id" },
  user: { type: Schema.Types.ObjectId, ref: "Admin", field: "_id" },
});
const likeSchemaMode = db.model("like", likeSchema);
module.exports = likeSchemaMode;
