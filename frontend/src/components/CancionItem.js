import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Una fila de la lista de canciones de un disco.
// Props:
//   cancion    -> el objeto canción { id, nombre, puntaje, ... }
//   numero     -> la posición en la lista (1, 2, 3...)
//   onEditar   -> qué hacer al tocar "Editar"
//   onEliminar -> qué hacer al tocar "Borrar"
export default function CancionItem({ cancion, numero, onEditar, onEliminar }) {
  return (
    <View style={styles.fila}>
      <Text style={styles.numero}>{numero}</Text>

      <View style={styles.info}>
        <Text style={styles.nombre}>{cancion.nombre}</Text>
        <Text style={styles.puntaje}>⭐ {cancion.puntaje}/10</Text>
      </View>

      <TouchableOpacity onPress={onEditar}>
        <Text style={styles.accion}>Editar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onEliminar}>
        <Text style={[styles.accion, styles.borrar]}>Borrar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  fila: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colores.tarjeta,
    borderRadius: 10,
    padding: 12,
    marginBottom: 8,
  },
  numero: {
    color: colores.textoSuave,
    width: 24,
  },
  info: {
    flex: 1,
  },
  nombre: {
    color: colores.texto,
    fontSize: 15,
  },
  puntaje: {
    color: colores.textoSuave,
    fontSize: 13,
    marginTop: 2,
  },
  accion: {
    color: colores.primario,
    fontWeight: 'bold',
    marginLeft: 14,
  },
  borrar: {
    color: colores.peligro,
  },
});
