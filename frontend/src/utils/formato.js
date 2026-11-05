// En JavaScript los decimales se escriben con punto (7.5),
// pero en Argentina los leemos con coma (7,5).
// Esta función solo cambia cómo se MUESTRA el número; el valor sigue siendo 7.5.
export const formatearPuntaje = (numero) => String(numero).replace('.', ',');
