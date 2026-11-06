import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import DiscoCard from '../components/DiscoCard';
import Boton from '../components/Boton';
import { obtenerDiscos } from '../services/discosService';
import { colores } from '../estilos/colores';
import { mostrarAviso } from '../utils/avisos';

export default function HomeScreen({ navigation }) {
  const [discos, setDiscos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      // El backend ya devuelve cada disco con su promedio
      // y la lista ordenada de mayor a menor promedio.
      const listaDiscos = await obtenerDiscos();
      setDiscos(listaDiscos);
    } catch (error) {
      mostrarAviso('Error', 'No se pudo conectar con el servidor');
    } finally {
      // "finally" se ejecuta siempre: haya salido bien o mal, dejamos de cargar.
      setCargando(false);
    }
  };

  useEffect(() => {
    // El evento 'focus' se dispara cada vez que esta pantalla vuelve a mostrarse
    // (al abrir la app y al volver desde otra pantalla). Así, si cargamos un disco
    // o puntuamos canciones, al volver al Home los promedios y el orden se actualizan.
    const desuscribir = navigation.addListener('focus', cargarDatos);

    // Al salir de la pantalla dejamos de escuchar el evento.
    return desuscribir;
  }, [navigation]);

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      <View style={styles.encabezadoLista}>
        <Text style={styles.subtitulo}>Mis discos</Text>
        <Boton titulo="+ Nuevo disco" onPress={() => navigation.navigate('DiscoForm')} />
      </View>

      {/* Renderizado condicional: cargando / lista vacía / lista de discos */}
      {cargando ? (
        <ActivityIndicator size="large" color={colores.primario} style={{ marginTop: 30 }} />
      ) : discos.length === 0 ? (
        <Text style={styles.sinDatos}>No cargaste ningún disco todavía</Text>
      ) : (
        discos.map((disco) => (
          <DiscoCard
            key={disco.id}
            disco={disco}
            // Pasamos el id del disco como parámetro a la pantalla de detalle
            onPress={() => navigation.navigate('DiscoDetalle', { discoId: disco.id })}
          />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  contenido: {
    padding: 16,
  },
  encabezadoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    color: colores.texto,
    fontSize: 22,
    fontWeight: 'bold',
  },
  sinDatos: {
    color: colores.textoSuave,
    textAlign: 'center',
    marginTop: 12,
  },
});
