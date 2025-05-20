const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Obtener token del header
  const token = req.header('Authorization');

  // Verificar si el token existe
  if (!token) {
    return res.status(401).json({ msg: 'No hay token, autorización denegada' });
  }

  try {
    // Verificar y decodificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // El token contiene el campo `id` del usuario
    next(); // Continuar al siguiente middleware o controlador
  } catch (err) {
    res.status(401).json({ msg: 'Token no válido' });
  }
};

module.exports = authMiddleware;
