const service = require('../services/discosService');

// El controller recibe la petición (req), le pide al service lo que haga falta
// y devuelve la respuesta (res). NO habla con la base de datos directamente.

const obtener = async (req, res) => {
  try {
    const data = await service.obtenerTodos();
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los discos' });
  }
};

const obtenerUno = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await service.obtenerPorId(id);
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el disco' });
  }
};

const crear = async (req, res) => {
  try {
    // Tomamos del body SOLO los campos que esperamos.
    // Así nadie puede mandarnos otros datos (por ejemplo un "id" inventado).
    const { titulo, banda, cantidad_canciones, foto_url } = req.body;

    const nuevo = await service.crear({ titulo, banda, cantidad_canciones, foto_url });
    res.status(201).json(nuevo); // 201 = "creado"
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el disco' });
  }
};

const actualizar = async (req, res) => {
  try {
    const { titulo, banda, cantidad_canciones, foto_url } = req.body;

    const data = await service.actualizar(req.params.id, {
      titulo,
      banda,
      cantidad_canciones,
      foto_url,
    });
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el disco' });
  }
};

const eliminar = async (req, res) => {
  try {
    await service.eliminar(req.params.id);
    res.json({ mensaje: 'Disco eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el disco' });
  }
};

module.exports = { obtener, obtenerUno, crear, actualizar, eliminar };
