import axios from 'axios';
import { BASE_URL } from '../config';

// Llamadas al backend relacionadas con canciones.

export const obtenerCancionesDeDisco = async (discoId) => {
  const res = await axios.get(`${BASE_URL}/canciones/disco/${discoId}`);
  return res.data;
};

// Devuelve { promedio, cantidad } de TODAS las canciones cargadas.
export const obtenerPromedio = async () => {
  const res = await axios.get(`${BASE_URL}/canciones/promedio`);
  return res.data;
};

export const crearCancion = async (cancion) => {
  const res = await axios.post(`${BASE_URL}/canciones`, cancion);
  return res.data;
};

export const actualizarCancion = async (id, cancion) => {
  const res = await axios.put(`${BASE_URL}/canciones/${id}`, cancion);
  return res.data;
};

export const eliminarCancion = async (id) => {
  const res = await axios.delete(`${BASE_URL}/canciones/${id}`);
  return res.data;
};
