const { createClient } = require('@supabase/supabase-js');

// Creamos UNA sola conexión a Supabase y la exportamos.
// Todos los services la importan desde acá, así no repetimos la configuración.
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

module.exports = supabase;
