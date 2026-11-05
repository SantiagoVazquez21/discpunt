import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';
import { formatearPuntaje } from '../utils/formato';

// Los 19 puntajes posibles: del 1 al 10, de a medio punto.
// Con .map() armamos un botón para cada uno.
const PUNTAJES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

// Selector de puntaje.
// Props:
//   valor    -> el puntaje elegido ahora (0 = ninguno todavía)
//   onCambiar -> función que recibe el número que tocó el usuario
export default function PuntajeSelector({ valor, onCambiar }) {
  return (
    <View style={styles.fila}>
      {PUNTAJES.map((numero) => (
        <TouchableOpacity
          key={numero}
          // Renderizado condicional del estilo: el número elegido se pinta de violeta
          style={[styles.numero, valor === numero && styles.elegido]}
          onPress={() => onCambiar(numero)}
        >
          <Text style={styles.texto}>{formatearPuntaje(numero)}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    flexWrap: 'wrap', // si no entran en una fila, pasan a la siguiente
    gap: 5,
  },
  numero: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
  elegido: {
    backgroundColor: colores.primario,
  },
  texto: {
    color: colores.texto,
    fontWeight: 'bold',
    fontSize: 13,
  },
});
