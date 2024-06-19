// import mongoose from 'mongoose'
var mongoose = require("mongoose");
const db = require("../../db");

const Schema = mongoose.Schema;

const adminSchema = new Schema(
  {
    user_name: String,
    password: String,
    id: {
      type: Number,
      unique: true,
    },
    create_time: String,
    // 管理员账号 1
    // 用户账号 2
    admin: { type: Number, default: 2 },
    status: {
      type: Number,
      default: 1,
    }, //1:管理、 2:H5 3：小程序会员
    avatar: { type: String, default: "default.jpg" },
    city: String,
    session_key: {
      type: String,
      default: "",
    },
    openid: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

adminSchema.index({ id: 1 });
adminSchema.add({
  weatherKey: {
    type: String,
    default: "",
  },
});
const Admin = db.model("Admin", adminSchema);

module.exports = Admin;
