const Option = require('../models/Option');
const Question = require('../models/Question');

exports.addOption = async (req, res) => {
  const { questionId, text, isCorrect } = req.body;

  try {
    const option = new Option({ question: questionId, text, isCorrect });
    await option.save();

    await Question.findByIdAndUpdate(questionId, {
      $push: { options: option._id },
    });

    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: 'Server Error' });
  }
};
