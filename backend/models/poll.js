const mongoose = require('mongoose');

const pollSchema = mongoose.Schema({
  title: { type: String, required: true },
  option1: { type: String, required: true },
  option2: { type: String, required: true },
  value1: { type: Number, required: true },
  value2: { type: Number, required: true },
  address1: { type: String, required: false },
  address2: { type: String, required: false }
});

module.exports = mongoose.model('Poll', pollSchema);
