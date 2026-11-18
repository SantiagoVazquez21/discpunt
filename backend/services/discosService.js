const supabase = require('../config/supabase');

const obtenerTodos = async () => {
  const { data, error } = await supabase
    .from('discos')
    .select('*, canciones(puntaje)')
    .order('id', { ascending: false }); // los más nuevos primero (el orden por promedio lo elige la app)
  if (error) throw error;

  // Calculamos el promedio de cada disco.
  const discos = data.map((disco) => {
    const cantidadPuntuadas = disco.canciones.length;

    let promedio = null; // null = todavía no tiene canciones puntuadas
    if (cantidadPuntuadas > 0) {
      const suma = disco.canciones.reduce((total, cancion) => total + cancion.puntaje, 0);
      promedio = Math.round((suma / cantidadPuntuadas) * 10) / 10; 
    }

    // Devolvemos el disco con su promedio
    return {
      id: disco.id,
      titulo: disco.titulo,
      banda: disco.banda,
      cantidad_canciones: disco.cantidad_canciones,
      foto_url: disco.foto_url,
      promedio: promedio,
      cantidad_puntuadas: cantidadPuntuadas,
    };
  });

  return discos;
};

const obtenerPorId = async (id) => {
  const { data, error } = await supabase
    .from('discos')
    .select('*')
    .eq('id', id)
    .single(); // .single() devuelve un objeto en vez de un array
  if (error) throw error;
  return data;
};

const crear = async (disco) => {
  // .select() al final hace que Supabase nos devuelva el registro creado (con su id)
  const { data, error } = await supabase.from('discos').insert(disco).select();
  if (error) throw error;
  return data[0];
};

const actualizar = async (id, cambios) => {
  const { data, error } = await supabase
    .from('discos')
    .update(cambios)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

const eliminar = async (id) => {
  // Las canciones del disco se borran solas por el "on delete cascade" de la tabla.
  const { error } = await supabase.from('discos').delete().eq('id', id);
  if (error) throw error;
};

module.exports = { obtenerTodos, obtenerPorId, crear, actualizar, eliminar };
