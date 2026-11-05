// Dirección del backend, publicado en Vercel.
// Así la app funciona desde cualquier lado (Snack, otro celular, otra red)
// sin necesidad de tener la PC prendida.
export const BASE_URL = 'https://discpunt-api.vercel.app/api';

// Para probar con el backend corriendo en tu PC (npm run dev), usá la IP de la PC
// en la red (con "ipconfig", en "Dirección IPv4"). "localhost" no sirve desde el
// celular, porque para el celular localhost es él mismo:
// export const BASE_URL = 'http://192.168.0.252:3000/api';
