const mongoose = require('mongoose');
const db = require('../../db')
const Schema = mongoose.Schema;
const userAccessSchema = new Schema({
  userId: {
    type: Number,
    required: true
  },
  ipAddress: {
    type: String,
    required: true
  },
  userAgent: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  total:{
    type:Number,
    default:0
  }
});

const UserAccess = db.model('UserAccess', userAccessSchema);

module.exports = UserAccess;