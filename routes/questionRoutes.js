const express = require('express');
const { addQuestion, getQuestions } = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addQuestion);
router.get('/:quizId', authMiddleware, getQuestions);

module.exports = router;
