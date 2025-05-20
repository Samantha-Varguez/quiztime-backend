const express = require('express');
const {
  addQuestion,
  getQuestions,
  updateQuestion,
  deleteQuestion,
} = require('../controllers/questionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addQuestion);
router.get('/', authMiddleware, getQuestions); // /api/questions?quizId=...
router.put('/:id', authMiddleware, updateQuestion);
router.delete('/:id', authMiddleware, deleteQuestion);

module.exports = router;
