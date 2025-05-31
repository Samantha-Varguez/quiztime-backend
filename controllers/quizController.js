const Quiz = require('../models/Quiz');

exports.createQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const quiz = new Quiz({ title, description, user: req.user.id });
    await quiz.save();

    // ✅ This line is critical
    res.status(201).json(quiz);
  } catch (err) {
    console.error('Error de servidor:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.getQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user.id });
    res.status(200).json(quizzes);
  } catch (err) {
    console.error('Error de servidor:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id).populate('user', 'username');
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });
    res.json(quiz);
  } catch (err) {
    console.error('Error de servidor:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateQuiz = async (req, res) => {
  const { title, description } = req.body;

  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    if (quiz.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    quiz.title = title || quiz.title;
    quiz.description = description || quiz.description;
    await quiz.save();

    res.json(quiz);
  } catch (err) {
    console.error('Error de servidor:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteQuiz = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.id);
    if (!quiz) return res.status(404).json({ msg: 'Quiz not found' });

    if (quiz.user.toString() !== req.user.id)
      return res.status(401).json({ msg: 'Unauthorized' });

    await quiz.deleteOne();
    res.json({ msg: 'Quiz eliminado' });
  } catch (err) {
    console.error('Error de servidor:', err.message);
    res.status(500).json({ error: 'Server Error' });
  }
};
