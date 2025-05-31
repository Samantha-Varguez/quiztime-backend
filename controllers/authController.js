const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

// Registro
exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty())
    return res.status(400).json({ errors: errors.array() });

  let { username, email, password } = req.body;
  email = email.toLowerCase();

  try {


    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ msg: 'Email ya está registrado.' });



    const user = new User({ username, email, password });
    await user.save();
    console.log("User guardado:", user);


    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

  
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
};

// Login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("Login - Email received:", email);
    console.log("Login - Plain password received:", password);

    if (!email || !password)
      return res
        .status(400)
        .json({ msg: 'Por favor proporciona email y contraseña.' });

    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      console.log('User not found');
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }

    console.log("Login - Hashed password from DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password mismatch');
      return res.status(400).json({ msg: 'Credenciales inválidas.' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log('Login successful. Sending token...');
    res.json({ token });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server Error' });
  }
};
