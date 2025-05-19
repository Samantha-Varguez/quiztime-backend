const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Configuración
dotenv.config();
const app = express();
connectDB();
app.use(express.json());
app.use(cors());

// Rutas
app.use('/api/auth', require('./routes/authRoutes'));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

// Iniciar servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
