-- =====================================================================
--  Discpunt - Cambio: permitir puntajes con ",5" (ej: 7.5)
--  Solo hace falta correrlo UNA vez en una base que ya tenía las tablas
--  creadas con la versión anterior de tablas.sql (puntaje entero).
--  Supabase: SQL Editor -> New query -> pegar -> Run
-- =====================================================================

-- 1) Sacamos la regla vieja (solo enteros del 1 al 10).
alter table canciones drop constraint canciones_puntaje_check;

-- 2) Cambiamos el tipo de la columna: de entero a número con 1 decimal.
--    Los puntajes que ya estaban guardados (ej: 8) pasan a ser 8.0.
alter table canciones alter column puntaje type numeric(3,1);

-- 3) Ponemos la regla nueva: entre 1 y 10, y solo enteros o ",5".
alter table canciones add constraint canciones_puntaje_check
  check (puntaje between 1 and 10 and puntaje * 2 = round(puntaje * 2));
