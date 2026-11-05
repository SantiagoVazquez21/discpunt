// Carga las variables del archivo .env (SUPABASE_URL y SUPABASE_KEY).
// Va primero de todo para que el resto del código ya las encuentre cargadas.
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();

// CORS: permite que una app que corre en el NAVEGADOR (por ejemplo la vista previa
// web de Expo Snack) pueda llamar a este backend. Sin esto, el navegador bloquea
// las peticiones porque vienen de otra dirección. En el celular no hace falta,
// pero no molesta.
app.use(cors());

// Permite leer el body de las peticiones en formato JSON
// (es lo que manda axios desde la app en los POST y PUT).
app.use(express.json());

// Ruta de prueba: si abrís http://localhost:3000 en el navegador
// y ves este mensaje, el servidor está andando.
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor funcionando ✅' });
});

// Cada recurso tiene su propio archivo de rutas.
app.use('/api/discos', require('./routes/discosRoutes'));
app.use('/api/canciones', require('./routes/cancionesRoutes'));

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});
