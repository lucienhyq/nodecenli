var mongoose = require("mongoose");
const db = require("../../../db");
const Schema = mongoose.Schema;
const likeSchema = new Schema({
  article: { type: mongoose.Schema.Types.ObjectId, ref: "Article" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "admin" },
  _id: {
    type: Number,
    default: 0,
  },
});
const likeSchemaMode = db.model("like", likeSchema);
module.exports = likeSchemaMode;