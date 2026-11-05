import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import TapaDisco from './TapaDisco';
import { colores } from '../estilos/colores';

// Tarjeta de un disco para la lista del Home.
// Props:
//   disco   -> el objeto disco que viene del backend
//   onPress -> qué hacer al tocar la tarjeta (ir al detalle)
export default function DiscoCard({ disco, onPress }) {
  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress}>
      <TapaDisco url={disco.foto_url} tamanio={64} />

      <View style={styles.info}>
        <Text style={styles.titulo}>{disco.titulo}</Text>
        <Text style={styles.banda}>{disco.banda}</Text>
        <Text style={styles.detalle}>{disco.cantidad_canciones} canciones</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', // tapa a la izquierda, texto a la derecha
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  info: {
    flex: 1, // ocupa todo el espacio que sobra al lado de la tapa
    marginLeft: 12,
  },
  titulo: {
    color: colores.texto,
    fontSize: 16,
    fontWeight: 'bold',
  },
  banda: {
    color: colores.textoSuave,
    fontSize: 14,
    marginTop: 2,
  },
  detalle: {
    color: colores.textoSuave,
    fontSize: 12,
    marginTop: 4,
  },
});
