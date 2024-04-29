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
    DivisionProvince: {
      type: String,
      default: "",
    },
    DivisionCity: {
      type: String,
      default: "",
    },
    // 表单内容
    FormContent: {
      type: Object,
      default: {},
    },
    // 提交表单人员信息
    member: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
    musicScore: {
      type: Schema.Types.ObjectId,
      ref: "musicScore",
      field: "_id",
    },
    form_id: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);
musicScore_record.index({ id: 1 });

const musicScore_record_model = db.model(
  "musicScore_record",
  musicScore_record
);

module.exports = musicScore_record_model;
