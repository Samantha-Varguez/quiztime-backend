const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema({
  quiz: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
  text: { type: String, required: true },
  options: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Option' }]
});

module.exports = mongoose.model('Question', QuestionSchema);
