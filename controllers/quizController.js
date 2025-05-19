const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const quiz = new Quiz({ title, description, user: req.user.id });
    await quiz.save();
    res.status(201).json(quiz);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id });
    res.status(200).json(quizzes);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
