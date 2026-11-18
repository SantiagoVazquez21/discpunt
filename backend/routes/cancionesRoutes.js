const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/cancionesController');

// Todas estas rutas empiezan con /api/canciones (lo definimos en index.js).
router.get('/disco/:discoId', ctrl.obtenerPorDisco);  // GET    /api/canciones/disco/5   
router.post('/', ctrl.crear);                         // POST   /api/canciones           
router.put('/:id', ctrl.actualizar);                  // PUT    /api/canciones/8         
router.delete('/:id', ctrl.eliminar);                 // DELETE /api/canciones/8      

module.exports = router;
