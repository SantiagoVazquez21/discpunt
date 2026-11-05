const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/cancionesController');

// Todas estas rutas empiezan con /api/canciones (lo definimos en index.js).
router.get('/promedio', ctrl.obtenerPromedio);        // GET    /api/canciones/promedio  -> promedio de TODAS las canciones
router.get('/disco/:discoId', ctrl.obtenerPorDisco);  // GET    /api/canciones/disco/5   -> canciones del disco 5
router.post('/', ctrl.crear);                         // POST   /api/canciones           -> agregar canción
router.put('/:id', ctrl.actualizar);                  // PUT    /api/canciones/8         -> editar canción
router.delete('/:id', ctrl.eliminar);                 // DELETE /api/canciones/8         -> borrar canción

module.exports = router;
