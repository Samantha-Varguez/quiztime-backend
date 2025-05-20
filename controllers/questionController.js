const Question = require('../models/Question');
const Option = require('../models/Option');

exports.addQuestion = async (req, res) => {
  const { quizId, text } = req.body;

  if (!quizId || !text) {
    return res.status(400).json({ msg: 'Quiz ID y texto de la pregunta son requeridos.' });
  }

  try {
    const question = new Question({ quiz: quizId, text });
    await question.save();
    res.status(201).json(question);
  } catch (err) {
    console.error('Error al agregar pregunta:', err.message);
    res.status(500).json({ error: 'Error del servidor' });
  }
};

exports.getQuestions = async (req, res) => {
  const { quizId } = req.query;
  try {
    const questions = await Question.find({ quiz: quizId }).lean();
    for (const q of questions) {
      q.options = await Option.find({ question: q._id }).lean();
    }
    res.json(questions); // ✅ This should be a plain array
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};


exports.updateQuestion = async (req, res) => {
  const { text } = req.body;

  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ msg: 'Question not found' });

    question.text = text || question.text;
    await question.save();
    res.json(question);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    if (!question) return res.status(404).json({ msg: 'Question not found' });

    await question.deleteOne();
    res.json({ msg: 'Question deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

