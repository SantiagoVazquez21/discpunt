const service = require('../services/cancionesService');

const obtenerPorDisco = async (req, res) => {
  try {
    const { discoId } = req.params;
    const data = await service.obtenerPorDisco(discoId);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las canciones' });
  }
};

const obtenerPromedio = async (req, res) => {
  try {
    const data = await service.obtenerPromedio();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al calcular el promedio' });
  }
};

const crear = async (req, res) => {
  try {
    // Solo los campos que esperamos. disco_id dice a qué disco pertenece.
    const { disco_id, nombre, puntaje } = req.body;

    const nueva = await service.crear({ disco_id, nombre, puntaje });
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la canción' });
  }
};

const actualizar = async (req, res) => {
  try {
    // Al editar NO dejamos cambiar el disco_id: la canción sigue en su disco.
    const { nombre, puntaje } = req.body;

    const data = await service.actualizar(req.params.id, { nombre, puntaje });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la canción' });
  }
};

const eliminar = async (req, res) => {
  try {
    await service.eliminar(req.params.id);
    res.json({ mensaje: 'Canción eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la canción' });
  }
};

module.exports = { obtenerPorDisco, obtenerPromedio, crear, actualizar, eliminar };
