const Answer = require('../models/Answer');
const Option = require('../models/Option');

exports.submitAnswers = async (req, res) => {
  const { answers } = req.body;
  const quizId = req.params.quizId;
  let score = 0;

  try {
    for (const entry of answers) {
      const { question, selectedOption } = entry;

      const option = await Option.findById(selectedOption);
      const isCorrect = option && option.isCorrect;

      if (isCorrect) score++;

      await new Answer({
        quiz: quizId,
        question,
        selectedOption,
        user: req.user.id,
      }).save();
    }

    res.json({ score });
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};

