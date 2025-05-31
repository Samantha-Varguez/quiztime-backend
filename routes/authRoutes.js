const express = require('express');
const { check } = require('express-validator');
const { register, login } = require('../controllers/authController');

const router = express.Router();

router.post(
  '/register',
  [
    check('username', 'El nombre de usuario es obligatorio').not().isEmpty(),
    check('email')
      .custom((value) => /^[wñÑ._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value))
      .withMessage('Por favor ingresa un email válido'),
    check('password', 'La contraseña debe tener al menos 6 caracteres').isLength({ min: 6 }),
  ],
  register
);

router.post('/login', login);

module.exports = router;

