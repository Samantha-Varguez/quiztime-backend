const express = require('express');
const { submitAnswers } = require('../controllers/answerController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/:quizId', authMiddleware, submitAnswers);

module.exports = router;
