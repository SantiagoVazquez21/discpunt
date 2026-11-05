const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/discosController');

// Las rutas solo dicen "qué URL va a qué función del controller".
// Todas empiezan con /api/discos (lo definimos en index.js).
router.get('/', ctrl.obtener);           // GET    /api/discos      -> todos los discos
router.get('/:id', ctrl.obtenerUno);     // GET    /api/discos/5    -> un disco
router.post('/', ctrl.crear);            // POST   /api/discos      -> crear disco
router.put('/:id', ctrl.actualizar);     // PUT    /api/discos/5    -> editar disco
router.delete('/:id', ctrl.eliminar);    // DELETE /api/discos/5    -> borrar disco

module.exports = router;
