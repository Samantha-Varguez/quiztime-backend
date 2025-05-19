const express = require('express');
const { createQuiz, getQuizzes } = require('../controllers/quizController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createQuiz);
router.get('/', authMiddleware, getQuizzes);

module.exports = router;
