const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DataSchema = new Schema({
  field1: {
    type: String,
    required: true
  },
  field2: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Data', DataSchema);
