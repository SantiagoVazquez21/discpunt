-- =====================================================================
--  Discpunt - Tablas de la base de datos
--  Copiar todo este archivo y ejecutarlo en Supabase:
--  Dashboard -> SQL Editor -> New query -> pegar -> Run
-- =====================================================================


-- ---------------------------------------------------------------------
-- Tabla DISCOS: un registro por cada álbum que cargamos.
-- ---------------------------------------------------------------------
create table discos (
  -- id automático: la base de datos le pone 1, 2, 3... sola.
  id bigint generated always as identity primary key,

  titulo text not null,               -- nombre del disco
  banda text not null,                -- nombre de la banda
  cantidad_canciones int not null     -- cuántas canciones tiene el disco
    check (cantidad_canciones > 0),   -- no puede ser 0 ni negativo
  foto_url text,                      -- link a la imagen de la tapa (opcional)

  created_at timestamptz default now()
);


-- ---------------------------------------------------------------------
-- Tabla CANCIONES: cada canción pertenece a UN disco.
-- Relación "uno a muchos": un disco tiene muchas canciones.
-- ---------------------------------------------------------------------
create table canciones (
  id bigint generated always as identity primary key,

  -- Clave foránea: guarda el id del disco al que pertenece la canción.
  -- "on delete cascade" = si se borra el disco, se borran sus canciones
  -- automáticamente (así no quedan canciones "huérfanas").
  disco_id bigint not null references discos(id) on delete cascade,

  nombre text not null,
  puntaje int not null
    check (puntaje between 1 and 10), -- la base rechaza puntajes fuera de 1 a 10

  created_at timestamptz default now()
);

-- Índice para que buscar "las canciones del disco X" sea rápido.
create index canciones_disco_id_idx on canciones (disco_id);


-- ---------------------------------------------------------------------
-- Seguridad (RLS = Row Level Security)
-- La activamos SIN crear políticas: así nadie puede leer ni escribir
-- estas tablas desde afuera con la clave pública.
-- El único que accede es nuestro backend, que usa la "Secret key"
-- (esa clave se saltea RLS y vive solo en el .env del servidor).
-- ---------------------------------------------------------------------
alter table discos enable row level security;
alter table canciones enable row level security;
