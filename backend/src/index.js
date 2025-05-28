const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const db = require('./config/db');
const citaRoutes = require('./routes/citaRoutes');

// Configuración de variables de entorno
dotenv.config();

// Inicialización de Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas básicas
app.get('/', (req, res) => {
  res.json({ message: 'API de Sistema de Taller funcionando correctamente' });
});

// Rutas de la API para citas
app.use('/api/citas', citaRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;

// Probar conexión a la base de datos
(async () => {
  try {
    await db.getConnection();
    console.log('Conexión a MySQL exitosa');
  } catch (error) {
    console.error('Error al conectar a MySQL:', error.message);
  }
})();

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
}); 