var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;
const musicScore = new Schema(
  {
    conten: {
      type: Object,
      default: {},
    },
    creatUid: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      field: "_id",
    },
  },
  {
    timestamps: { createdAt: "created", updatedAt: "updated" },
  }
);

const musicScore_m = db.model("musicScore", musicScore);

module.exports = musicScore_m;
