import { useState, useEffect } from 'react';
import { View, Text, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import DiscoCard from '../components/DiscoCard';
import Boton from '../components/Boton';
import { obtenerDiscos } from '../services/discosService';
import { obtenerPromedio } from '../services/cancionesService';
import { colores } from '../estilos/colores';
import { formatearPuntaje } from '../utils/formato';
import { mostrarAviso } from '../utils/avisos';

export default function HomeScreen({ navigation }) {
  const [discos, setDiscos] = useState([]);
  const [promedio, setPromedio] = useState({ promedio: 0, cantidad: 0 });
  const [cargando, setCargando] = useState(true);

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const listaDiscos = await obtenerDiscos();
      const datosPromedio = await obtenerPromedio();
      setDiscos(listaDiscos);
      setPromedio(datosPromedio);
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
    // o puntuamos canciones, al volver al Home la lista y el promedio se actualizan.
    const desuscribir = navigation.addListener('focus', cargarDatos);

    // Al salir de la pantalla dejamos de escuchar el evento.
    return desuscribir;
  }, [navigation]);

  return (
    <ScrollView style={styles.pantalla} contentContainerStyle={styles.contenido}>
      {/* ----- Promedio general ----- */}
      <View style={styles.cajaPromedio}>
        <Text style={styles.etiqueta}>Promedio de todas tus canciones</Text>

        {/* Renderizado condicional: si no hay canciones, mostramos un mensaje */}
        {promedio.cantidad === 0 ? (
          <Text style={styles.sinDatos}>Todavía no puntuaste ninguna canción</Text>
        ) : (
          <>
            <Text style={styles.numeroPromedio}>
              {formatearPuntaje(promedio.promedio)}
              <Text style={styles.sobreDiez}> / 10</Text>
            </Text>
            <Text style={styles.etiqueta}>sobre {promedio.cantidad} canciones</Text>
          </>
        )}
      </View>

      {/* ----- Lista de discos ----- */}
      <View style={styles.encabezadoLista}>
        <Text style={styles.subtitulo}>Mis discos</Text>
        <Boton titulo="+ Nuevo disco" onPress={() => navigation.navigate('DiscoForm')} />
      </View>

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
  cajaPromedio: {
    backgroundColor: colores.tarjeta,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  etiqueta: {
    color: colores.textoSuave,
    fontSize: 14,
  },
  numeroPromedio: {
    color: colores.primario,
    fontSize: 56,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  sobreDiez: {
    color: colores.textoSuave,
    fontSize: 22,
  },
  encabezadoLista: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  subtitulo: {
    color: colores.texto,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sinDatos: {
    color: colores.textoSuave,
    textAlign: 'center',
    marginTop: 12,
  },
});
