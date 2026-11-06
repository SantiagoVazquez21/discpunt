const supabase = require('../config/supabase');

// El service es la ÚNICA capa que habla con la base de datos.
// Cada función hace una consulta a Supabase y devuelve los datos.
// Si Supabase devuelve un error, lo "tiramos" (throw) para que el controller
// lo atrape en su catch y responda con un 500.

const obtenerTodos = async () => {
  // Traemos cada disco JUNTO con los puntajes de sus canciones.
  // "canciones(puntaje)" funciona porque la tabla canciones tiene la clave
  // foránea disco_id: Supabase sabe qué canciones son de cada disco.
  // Resultado: [{ id, titulo, ..., canciones: [{ puntaje: 8 }, { puntaje: 7.5 }] }, ...]
  const { data, error } = await supabase
    .from('discos')
    .select('*, canciones(puntaje)')
    .order('id', { ascending: false }); // si dos discos empatan, el más nuevo va primero
  if (error) throw error;

  // Calculamos el promedio de cada disco.
  const discos = data.map((disco) => {
    const cantidadPuntuadas = disco.canciones.length;

    let promedio = null; // null = todavía no tiene canciones puntuadas
    if (cantidadPuntuadas > 0) {
      const suma = disco.canciones.reduce((total, cancion) => total + cancion.puntaje, 0);
      promedio = Math.round((suma / cantidadPuntuadas) * 10) / 10; // 1 decimal (ej: 7.4)
    }

    // Devolvemos el disco con su promedio (la lista de canciones no hace falta en el Home)
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

  // Ordenamos de MAYOR a MENOR promedio.
  // Los discos sin promedio (null) los tratamos como -1 para que queden al final.
  discos.sort((a, b) => {
    const promedioA = a.promedio === null ? -1 : a.promedio;
    const promedioB = b.promedio === null ? -1 : b.promedio;
    return promedioB - promedioA; // si da positivo, b va antes que a
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
