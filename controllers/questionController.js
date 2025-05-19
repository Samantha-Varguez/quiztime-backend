const Question = require('../models/Question');

// Add a question to a quiz
exports.addQuestion = async (req, res) => {
  const { quizId, text } = req.body;

  try {
    const question = new Question({ quiz: quizId, text });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

// Fetch questions for a quiz
exports.getQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ quiz: req.params.quizId });
    res.status(200).json(questions);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
