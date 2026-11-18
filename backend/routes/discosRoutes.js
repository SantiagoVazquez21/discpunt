const express = require('express');
const router = express.Router();

const ctrl = require('../controllers/discosController');

// Todas empiezan con /api/discos (lo definimos en index.js).
router.get('/', ctrl.obtener);           // GET    /api/discos      
router.get('/:id', ctrl.obtenerUno);     // GET    /api/discos/5    
router.post('/', ctrl.crear);            // POST   /api/discos      
router.put('/:id', ctrl.actualizar);     // PUT    /api/discos/5    
router.delete('/:id', ctrl.eliminar);    // DELETE /api/discos/5    

module.exports = router;
