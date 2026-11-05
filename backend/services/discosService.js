const supabase = require('../config/supabase');

// El service es la ÚNICA capa que habla con la base de datos.
// Cada función hace una consulta a Supabase y devuelve los datos.
// Si Supabase devuelve un error, lo "tiramos" (throw) para que el controller
// lo atrape en su catch y responda con un 500.

const obtenerTodos = async () => {
  const { data, error } = await supabase
    .from('discos')
    .select('*')
    .order('id', { ascending: false }); // los últimos cargados aparecen primero
  if (error) throw error;
  return data;
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
