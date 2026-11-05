import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Botón reutilizable. Lo usamos en todas las pantallas.
// Props:
//   titulo   -> el texto del botón
//   onPress  -> la función que se ejecuta al tocarlo
//   tipo     -> 'primario' (violeta), 'secundario' (gris) o 'peligro' (rojo)
//   desactivado -> si es true, el botón no se puede tocar
export default function Boton({ titulo, onPress, tipo = 'primario', desactivado = false }) {
  return (
    <TouchableOpacity
      style={[styles.boton, styles[tipo], desactivado && styles.desactivado]}
      onPress={onPress}
      disabled={desactivado}
    >
      <Text style={styles.texto}>{titulo}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  primario: {
    backgroundColor: colores.primario,
  },
  secundario: {
    backgroundColor: colores.borde,
  },
  peligro: {
    backgroundColor: colores.peligro,
  },
  desactivado: {
    opacity: 0.5,
  },
  texto: {
    color: colores.texto,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
