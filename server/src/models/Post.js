const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  from: {
    type: String,
    required: true
  },
  to: {
    type: String,
    required: true
  },
  message: {
    type: String,
  },
  files: {
    type: Array,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
})

const Post = mongoose.model('post', PostSchema);
module.exports = Post;
