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

module.exports = { obtenerPorDisco, crear, actualizar, eliminar };
