var mongoose = require("mongoose");
const db = require("../../db");
const { array } = require("../../js/multerConfig");

const Schema = mongoose.Schema;

const Movie = new Schema(
  {
    id: {
      type: Number,
      default: 0,
    },
    // 标题
    title: {
      type: String,
      default: "",
    },
    eqxd: {
      type: String,
      default: "",
    },
    // 图片
    pica: {
      type: String,
      default: "",
    },
    // 评分
    doubanfen: {
      type: String,
      default: "",
    },
    // 地区
    diqu: {
      type: String,
      default: "",
    },
    // 年代
    niandai: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);
Movie.add({
  // 简介
  summary: {
    type: String,
    default: "",
  },
  // 资源
  dynamicData: {
    type: Array,
    default: [],
  },
  // 是否是电视剧
  isTvseries: {
    type: Boolean,
    default: false,
  }
});
Movie.index({ id: 1 });

const MovieSchema = db.model("Movie", Movie);

module.exports = MovieSchema;
