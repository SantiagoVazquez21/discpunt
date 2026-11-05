const supabase = require('../config/supabase');

const obtenerPorDisco = async (discoId) => {
  const { data, error } = await supabase
    .from('canciones')
    .select('*')
    .eq('disco_id', discoId) // solo las canciones de ESTE disco
    .order('id', { ascending: true }); // en el orden en que se cargaron
  if (error) throw error;
  return data;
};

const obtenerPromedio = async () => {
  // Traemos solo la columna puntaje de todas las canciones.
  const { data, error } = await supabase.from('canciones').select('puntaje');
  if (error) throw error;

  // Si todavía no hay canciones, no podemos dividir por 0.
  if (data.length === 0) {
    return { promedio: 0, cantidad: 0 };
  }

  // Sumamos todos los puntajes con reduce y dividimos por la cantidad.
  const suma = data.reduce((total, cancion) => total + cancion.puntaje, 0);
  const promedio = suma / data.length;

  return {
    promedio: Math.round(promedio * 10) / 10, // redondeado a 1 decimal (ej: 7.3)
    cantidad: data.length,
  };
};

const crear = async (cancion) => {
  const { data, error } = await supabase.from('canciones').insert(cancion).select();
  if (error) throw error;
  return data[0];
};

const actualizar = async (id, cambios) => {
  const { data, error } = await supabase
    .from('canciones')
    .update(cambios)
    .eq('id', id)
    .select();
  if (error) throw error;
  return data[0];
};

const eliminar = async (id) => {
  const { error } = await supabase.from('canciones').delete().eq('id', id);
  if (error) throw error;
};

module.exports = { obtenerPorDisco, obtenerPromedio, crear, actualizar, eliminar };
