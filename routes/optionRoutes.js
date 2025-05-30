const express = require('express');
const { addOption } = require('../controllers/optionController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, addOption);

module.exports = router;
