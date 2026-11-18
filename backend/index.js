// Carga las variables del archivo .env (SUPABASE_URL y SUPABASE_KEY).
// Va primero de todo para que el resto del código ya las encuentre cargadas.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// Permite que el navegador pueda llamar a este backend.
app.use(cors());

// Permite leer el body de las peticiones en formato JSON
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando ✅' });
});

// Cada recurso tiene su propio archivo de rutas.
app.use('/api/discos', require('./routes/discosRoutes'));
app.use('/api/canciones', require('./routes/cancionesRoutes'));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
