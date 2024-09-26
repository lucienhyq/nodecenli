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
    type: Array,
    default: [],
  },
  isTvseries: {
    type: Boolean,
    default: false,
  },
});
Movie.index({ id: 1 });

const MovieSchema = db.model("Movie", Movie);

module.exports = MovieSchema;
