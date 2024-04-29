var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;
const musicScore = new Schema(
  {
    // 表单自定义id
    id: {
      type: Number,
      default: 0,
    },
    // 表单内容
    FormContent: {
      type: Array,
      default: [],
    },
    // 创建表单人员信息
    creatUid: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    // 表单名称
    formName: {
      type: String,
      default: "",
    },
    formImg: {
      type: String,
      default: "",
    },
    formDesc: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);
musicScore.index({ id: 1 });
musicScore.add({
  isMusicForm: {
    type: Boolean,
    default: false,
  },
});

const musicScore_m = db.model("musicScore", musicScore);

module.exports = musicScore_m;
