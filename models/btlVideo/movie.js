var mongoose = require("mongoose");
const db = require("../../db");

const Schema = mongoose.Schema;

// 定义子模型
const DynamicEntrySchema = new Schema({
  new: {
    type: Boolean,
    default: false,
  },
  id: {
    type: Number,
    required: true,
  },
  text_html: {
    type: String,
    default: "",
  },
  audio_html: {
    type: String,
    default: "",
  },
  zname: {
    type: String,
    required: true,
  },
  ecb: {
    type: String,
    default: "",
  },
  zsize: {
    type: String,
    required: true,
  },
  zqxd: {
    type: String,
    required: true,
  },
  zlink: {
    type: String,
    required: true,
  },
  down: {
    type: String,
    required: true,
  },
  ezt: {
    type: String,
    required: true,
  },
});
const Movie = new Schema(
  {
    id: {
      type: Number,
      default: 0,
    },
    title: {
      type: String,
      default: "",
    },
    eqxd: {
      type: String,
      default: "",
    },
    pica: {
      type: String,
      default: "",
    },
    doubanfen: {
      type: String,
      default: "",
    },
    diqu: {
      type: String,
      default: "",
    },
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
  summary: {
    type: String,
    default: "",
  },
  dynamicData: {
    type: Map,
    of: DynamicEntrySchema,
    default: () => new Map(),
  },
});
Movie.index({ id: 1 });

const MovieSchema = db.model("Movie", Movie);

module.exports = MovieSchema;
