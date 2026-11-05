import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Los 10 puntajes posibles. Con .map() armamos un botón para cada uno.
const PUNTAJES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Selector de puntaje del 1 al 10.
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
          <Text style={styles.texto}>{numero}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    flexWrap: 'wrap', // si no entran en una fila, pasan a la siguiente
    gap: 6,
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
  },
});
