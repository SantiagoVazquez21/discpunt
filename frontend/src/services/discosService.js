import axios from 'axios';
import { BASE_URL } from '../config';

// Acá están TODAS las llamadas al backend relacionadas con discos.
// Las pantallas no usan axios directamente: llaman a estas funciones.
// Así, si cambia una URL, se cambia en un solo lugar.
// axios devuelve la respuesta en "res"; los datos del backend vienen en res.data.

export const obtenerDiscos = async () => {
  const res = await axios.get(`${BASE_URL}/discos`);
  return res.data;
};

export const obtenerDisco = async (id) => {
  const res = await axios.get(`${BASE_URL}/discos/${id}`);
  return res.data;
};

export const crearDisco = async (disco) => {
  const res = await axios.post(`${BASE_URL}/discos`, disco);
  return res.data; // el backend devuelve el disco creado (con su id)
};

export const actualizarDisco = async (id, disco) => {
  const res = await axios.put(`${BASE_URL}/discos/${id}`, disco);
  return res.data;
};

export const eliminarDisco = async (id) => {
  const res = await axios.delete(`${BASE_URL}/discos/${id}`);
  return res.data;
};
