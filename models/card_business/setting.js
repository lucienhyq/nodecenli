var mongoose = require("mongoose");
const db = require("../../db");
const Schema = mongoose.Schema;

const cardSetBussinessSchema = new Schema(
  {
    company_name: {
      type: String,
      default: "",
    },
    company_address: {
      type: String,
      default: "",
    },
    development_history: {
      type: Object,
      default: {},
    },
    main_business: {
      type: Object,
      default: {},
    },
    company_desc: {
      type: String,
      default: "",
    },
    shareUid: {
      type: Number,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const cardSetBussiness = db.model("cardBussiness", cardSetBussinessSchema);

module.exports = cardSetBussiness;
