import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Color de fondo según el tipo de botón.
const FONDOS = {
  primario: colores.primario, // violeta
  secundario: colores.borde, // gris
  peligro: colores.peligro, // rojo
};

// Botón reutilizable. Lo usamos en todas las pantallas.
// Props:
//   titulo   -> el texto del botón
//   onPress  -> la función que se ejecuta al tocarlo
//   tipo     -> 'primario', 'secundario' o 'peligro' (cambia el color)
//   desactivado -> si es true, el botón no se puede tocar
export default function Boton({ titulo, onPress, tipo = 'primario', desactivado = false }) {
  return (
    <TouchableOpacity
      style={[
        styles.boton,
        { backgroundColor: FONDOS[tipo] },
        desactivado && styles.desactivado,
      ]}
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
  desactivado: {
    opacity: 0.5,
  },
  texto: {
    color: colores.texto,
    fontWeight: 'bold',
    fontSize: 15,
  },
});
