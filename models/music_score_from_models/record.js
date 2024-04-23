var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;
const musicScore_record = new Schema(
  {
    // 表单记录自定义id
    id: {
      type: Number,
      default: 0,
    },
    // 表单内容
    FormContent: {
      type: Object,
      default: {},
    },
    // 创建表单人员信息
    member: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    musicScore:{
      type: Schema.Types.ObjectId,
      ref: "musicScore",
      field: "_id",
    }
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);
musicScore.index({ id: 1 });

const musicScore_record_model = db.model("musicScore_record", musicScore_record);

module.exports = musicScore_record_model;
