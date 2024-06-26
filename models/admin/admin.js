const bcrypt = require('bcrypt');
var mongoose = require("mongoose");
const db = require("../../db");

const Schema = mongoose.Schema;

// 为了提高代码的可读性和可维护性，定义默认值常量。
const DEFAULT_USER_NAME = "默认用户";
const DEFAULT_PASSWORD = "123456";
const DEFAULT_AVATAR_URL = `${process.env.APP_DOMAIN}/uploads/default.jpg`;

const adminSchema = new Schema(
  {
    user_name: {
      type: String,
      default: DEFAULT_USER_NAME,
    },
    // 使用bcrypt对密码进行加密存储。默认密码保持不变，但在实际应用中应该通过安全的方式生成。
    password: {
      type: String,
      default: DEFAULT_PASSWORD,
    },
    id: {
      type: String, // 修改为String类型以避免整数溢出的问题。
      unique: true,
    },
    create_time: String,
    admin: { type: Number, default: 2 },
    status: {
      type: Number,
      default: 1,
    },
    avatar: { type: String, default: DEFAULT_AVATAR_URL },
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
    timestamps: true, // 自动管理创建和更新的时间戳。
  }
);

// 为id字段添加唯一性索引。
adminSchema.index({ id: 1 }, { unique: true });

// 添加weatherKey字段，保持原有逻辑不变。
adminSchema.add({
  weatherKey: {
    type: String,
    default: "",
  },
});

// 对模型方法进行扩展，例如添加验证密码的方法。
adminSchema.methods.ValidatesPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
}

// 在保存文档之前，对密码进行加密。
adminSchema.pre('save', function(next) {
  const admin = this;
  // 判断是新创建的文档还是密码字段被修改
  if (this.isNew || this.isModified('password')) {
      bcrypt.hash(admin.password, 10, function(err, hashedPassword) {
          if (err) return next(err);
          // 将明文密码替换为加密后的密码
          admin.password = hashedPassword;
          next();
      });
  } else {
      // 如果不是新文档且密码未被修改，则直接进入下一个中间件
      next();
  }
});

const Admin = db.model("Admin", adminSchema);

module.exports = Admin;