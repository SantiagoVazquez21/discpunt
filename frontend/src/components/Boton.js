import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Botón reutilizable. Lo usamos en todas las pantallas.
// Props:
//   titulo   -> el texto del botón
//   onPress  -> la función que se ejecuta al tocarlo
//   tipo     -> 'primario' (azul), 'secundario' (solo borde) o 'peligro' (rojo)
//   desactivado -> si es true, el botón no se puede tocar
export default function Boton({ titulo, onPress, tipo = 'primario', desactivado = false }) {
  return (
    <TouchableOpacity
      style={[styles.boton, styles[tipo], desactivado && styles.desactivado]}
      onPress={onPress}
      disabled={desactivado}
    >
      {/* El secundario no tiene fondo de color, así que su texto usa el color normal */}
      <Text style={[styles.texto, tipo === 'secundario' && styles.textoSecundario]}>
        {titulo}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  boton: {
    paddingVertical: 11,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    alignItems: 'center',
  },
  primario: {
    backgroundColor: colores.primario,
    borderColor: colores.primario,
  },
  secundario: {
    backgroundColor: colores.fondo,
    borderColor: colores.borde,
  },
  peligro: {
    backgroundColor: colores.peligro,
    borderColor: colores.peligro,
  },
  desactivado: {
    opacity: 0.5,
  },
  texto: {
    color: colores.textoSobreColor,
    fontWeight: '600',
    fontSize: 15,
  },
  textoSecundario: {
    color: colores.texto,
  },
});
