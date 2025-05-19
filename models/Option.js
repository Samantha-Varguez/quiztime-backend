const mongoose = require('mongoose');

const OptionSchema = new mongoose.Schema({
  question: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
});

module.exports = mongoose.model('Option', OptionSchema);
