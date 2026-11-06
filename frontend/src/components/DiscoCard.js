import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import TapaDisco from './TapaDisco';
import { colores } from '../estilos/colores';
import { formatearPuntaje } from '../utils/formato';

// Tarjeta de un disco para la lista del Home.
// Props:
//   disco   -> el disco que viene del backend, con su promedio:
//              { titulo, banda, foto_url, cantidad_canciones, promedio, cantidad_puntuadas }
//              (promedio es null si todavía no tiene canciones puntuadas)
//   onPress -> qué hacer al tocar la tarjeta (ir al detalle)
export default function DiscoCard({ disco, onPress }) {
  const tienePromedio = disco.promedio !== null;

  return (
    <TouchableOpacity style={styles.tarjeta} onPress={onPress}>
      <TapaDisco url={disco.foto_url} tamanio={64} />

      <View style={styles.info}>
        <Text style={styles.titulo} numberOfLines={1}>
          {disco.titulo}
        </Text>
        <Text style={styles.banda} numberOfLines={1}>
          {disco.banda}
        </Text>
        <Text style={styles.detalle}>
          {tienePromedio
            ? `${disco.cantidad_puntuadas} de ${disco.cantidad_canciones} puntuadas`
            : 'Sin canciones puntuadas'}
        </Text>
      </View>

      {/* Renderizado condicional: el promedio, o un guion si no tiene */}
      <View style={styles.promedio}>
        {tienePromedio ? (
          <>
            <Text style={styles.numero}>{formatearPuntaje(disco.promedio)}</Text>
            <Text style={styles.sobreDiez}>/10</Text>
          </>
        ) : (
          <Text style={styles.sinPromedio}>–</Text>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tarjeta: {
    flexDirection: 'row', // tapa a la izquierda, texto al medio, promedio a la derecha
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    padding: 12,
    marginBottom: 10,
  },
  info: {
    flex: 1, // ocupa todo el espacio que sobra entre la tapa y el promedio
    marginLeft: 12,
    marginRight: 8,
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
  promedio: {
    alignItems: 'center',
    minWidth: 52,
  },
  numero: {
    color: colores.primario,
    fontSize: 26,
    fontWeight: 'bold',
  },
  sobreDiez: {
    color: colores.textoSuave,
    fontSize: 12,
  },
  sinPromedio: {
    color: colores.textoSuave,
    fontSize: 26,
  },
});
