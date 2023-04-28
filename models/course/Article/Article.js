var mongoose = require('mongoose');
const db = require('../../../db');
const Schema = mongoose.Schema;
const articleSchema = new Schema({
  title: String,
  id: {
    type: Number,
    unique: true,
    default: 1
  },
  news_id: {
    type: String
  },
  vid: {
    type: String
  },
  poster: String,
  conten: {
    type: String
  },
  videoSrc: String,
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
  // comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
})
const article = db.model('Article', articleSchema);
module.exports = article;