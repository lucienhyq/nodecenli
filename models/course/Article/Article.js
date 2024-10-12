var mongoose = require("mongoose");
const db = require("../../../db");
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: String,
  id: {
    type: Number,
    unique: true,
    default: 1,
  },
  news_id: {
    type: String,
  },
  vid: {
    type: String,
  },
  poster: String,
  conten: {
    type: String,
  },
  videoSrc: String,
  likes: [{ type: Schema.Types.ObjectId, ref: "like", field: "_id" }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});
articleSchema.add({
  // 浏览量
  pageviews: {
    type: Number,
    default: 0,
  },
  // 作者
  source: {
    type: String,
    default: "",
  },
  updated_time: {
    type: String,
    default: "",
  },
  cnt_attr: {
    type: Array,
    default: [],
  },
});
// 添加虚拟字段来表示 likes 用户
articleSchema.virtual("likeUsers", {
  ref: "like",
  localField: "likes",
  foreignField: "_id",
  justOne: false,
});
articleSchema.index({ id: 1 }, { unique: true });
const article = db.model("Article", articleSchema);
module.exports = article;
