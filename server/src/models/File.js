const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const FileSchema = new Schema({
  name: {
    type: String,
  },
  originalName: {
    type: String,
    required: true
  },
  mimeType: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  create: {
    type: Date,
    default: Date.now
  },
})

const File = mongoose.model('files', FileSchema);
module.exports = File;
