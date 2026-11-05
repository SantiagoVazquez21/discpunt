import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import TapaDisco from '../components/TapaDisco';
import Boton from '../components/Boton';
import CancionItem from '../components/CancionItem';
import PuntajeSelector from '../components/PuntajeSelector';
import { obtenerDisco, eliminarDisco } from '../services/discosService';
import {
  obtenerCancionesDeDisco,
  crearCancion,
  actualizarCancion,
  eliminarCancion,
} from '../services/cancionesService';
import { colores } from '../estilos/colores';

export default function DiscoDetalleScreen({ navigation, route }) {
  // Recibimos el id del disco como parámetro desde el Home (o desde el formulario).
  const { discoId } = route.params;

  const [disco, setDisco] = useState(null);
  const [canciones, setCanciones] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados del formulario de canción
  const [nombre, setNombre] = useState('');
  const [puntaje, setPuntaje] = useState(0); // 0 = todavía no eligió puntaje
  // Si es null estamos AGREGANDO; si tiene una canción, la estamos EDITANDO.
  const [cancionEditando, setCancionEditando] = useState(null);

  const cargarCanciones = async () => {
    const lista = await obtenerCancionesDeDisco(discoId);
    setCanciones(lista);
  };

  const cargarDatos = async () => {
    try {
      setCargando(true);
      const datosDisco = await obtenerDisco(discoId);
      setDisco(datosDisco);
      await cargarCanciones();
    } catch (error) {
      Alert.alert('Error', 'No se pudo cargar el disco');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // Recargamos cada vez que la pantalla vuelve a verse
    // (por ejemplo, al volver de "Editar disco" con los datos cambiados).
    const desuscribir = navigation.addListener('focus', cargarDatos);
    return desuscribir;
  }, [navigation]);

  // ---------- Disco ----------

  const confirmarEliminarDisco = () => {
    Alert.alert(
      'Eliminar disco',
      `¿Seguro que querés eliminar "${disco.titulo}"? También se borran sus canciones.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await eliminarDisco(disco.id);
              navigation.goBack(); // volvemos al Home
            } catch (e) {
              Alert.alert('Error', 'No se pudo eliminar el disco');
            }
          },
        },
      ]
    );
  };

  // ---------- Canciones ----------

  const limpiarFormulario = () => {
    setNombre('');
    setPuntaje(0);
    setCancionEditando(null);
  };

  const guardarCancion = async () => {
    if (nombre.trim() === '') {
      Alert.alert('Revisá los datos', 'El nombre de la canción es obligatorio');
      return;
    }
    if (puntaje < 1 || puntaje > 10) {
      Alert.alert('Revisá los datos', 'Elegí un puntaje del 1 al 10');
      return;
    }

    try {
      if (cancionEditando) {
        await actualizarCancion(cancionEditando.id, { nombre: nombre.trim(), puntaje });
      } else {
        // disco_id es lo que "une" la canción con este disco en la base de datos
        await crearCancion({ disco_id: discoId, nombre: nombre.trim(), puntaje });
      }
      limpiarFormulario();
      await cargarCanciones(); // refrescamos la lista
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar la canción');
    }
  };

  // Al tocar "Editar" en una canción, pasamos sus datos al formulario.
  const empezarEdicion = (cancion) => {
    setCancionEditando(cancion);
    setNombre(cancion.nombre);
    setPuntaje(cancion.puntaje);
  };

  const confirmarEliminarCancion = (cancion) => {
    Alert.alert('Eliminar canción', `¿Eliminar "${cancion.nombre}"?`, [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        style: 'destructive',
        onPress: async () => {
          try {
            await eliminarCancion(cancion.id);
            // Si justo estábamos editando esa canción, limpiamos el formulario
            if (cancionEditando && cancionEditando.id === cancion.id) {
              limpiarFormulario();
            }
            await cargarCanciones();
          } catch (e) {
            Alert.alert('Error', 'No se pudo eliminar la canción');
          }
        },
      },
    ]);
  };

  // ---------- Vista ----------

  if (cargando || !disco) {
    return (
      <View style={[styles.pantalla, styles.centrado]}>
        <ActivityIndicator size="large" color={colores.primario} />
      </View>
    );
  }

  // Si ya cargamos todas las canciones del disco, no mostramos el formulario
  // para agregar (pero sí para editar una existente).
  const discoCompleto = canciones.length >= disco.cantidad_canciones;

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      {/* ----- Datos del disco ----- */}
      <View style={styles.cabecera}>
        <TapaDisco url={disco.foto_url} tamanio={200} />
        <Text style={styles.titulo}>{disco.titulo}</Text>
        <Text style={styles.banda}>{disco.banda}</Text>
        <Text style={styles.progreso}>
          {canciones.length} de {disco.cantidad_canciones} canciones cargadas
        </Text>
      </View>

      <View style={styles.filaBotones}>
        <View style={styles.botonMitad}>
          <Boton
            titulo="Editar disco"
            tipo="secundario"
            onPress={() =>
              navigation.navigate('DiscoForm', {
                disco: disco,
                cancionesCargadas: canciones.length,
              })
            }
          />
        </View>
        <View style={styles.botonMitad}>
          <Boton titulo="Eliminar disco" tipo="peligro" onPress={confirmarEliminarDisco} />
        </View>
      </View>

      {/* ----- Formulario de canción ----- */}
      {discoCompleto && !cancionEditando ? (
        <Text style={styles.completo}>Ya cargaste todas las canciones de este disco 🎉</Text>
      ) : (
        <View style={styles.formulario}>
          <Text style={styles.subtitulo}>
            {cancionEditando ? 'Editar canción' : 'Agregar canción'}
          </Text>

          <TextInput
            style={styles.input}
            value={nombre}
            onChangeText={setNombre}
            placeholder="Nombre de la canción"
            placeholderTextColor={colores.textoSuave}
          />

          <Text style={styles.label}>Tu puntaje</Text>
          <PuntajeSelector valor={puntaje} onCambiar={setPuntaje} />

          <View style={styles.filaBotones}>
            <View style={styles.botonMitad}>
              <Boton
                titulo={cancionEditando ? 'Guardar cambios' : 'Agregar'}
                onPress={guardarCancion}
              />
            </View>
            {/* El botón Cancelar solo aparece mientras editamos */}
            {cancionEditando && (
              <View style={styles.botonMitad}>
                <Boton titulo="Cancelar" tipo="secundario" onPress={limpiarFormulario} />
              </View>
            )}
          </View>
        </View>
      )}

      {/* ----- Lista de canciones ----- */}
      <Text style={styles.subtitulo}>Canciones</Text>
      {canciones.length === 0 ? (
        <Text style={styles.sinDatos}>Todavía no cargaste canciones</Text>
      ) : (
        canciones.map((cancion, index) => (
          <CancionItem
            key={cancion.id}
            cancion={cancion}
            numero={index + 1}
            onEditar={() => empezarEdicion(cancion)}
            onEliminar={() => confirmarEliminarCancion(cancion)}
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
  centrado: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contenido: {
    padding: 16,
    paddingBottom: 40,
  },
  cabecera: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titulo: {
    color: colores.texto,
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
    textAlign: 'center',
  },
  banda: {
    color: colores.textoSuave,
    fontSize: 17,
    marginTop: 2,
  },
  progreso: {
    color: colores.primario,
    marginTop: 8,
  },
  filaBotones: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  botonMitad: {
    flex: 1, // los botones se reparten el ancho en partes iguales
  },
  formulario: {
    backgroundColor: colores.tarjeta,
    borderRadius: 12,
    padding: 14,
    marginTop: 20,
    marginBottom: 20,
  },
  subtitulo: {
    color: colores.texto,
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    color: colores.textoSuave,
    marginTop: 12,
    marginBottom: 8,
  },
  input: {
    backgroundColor: colores.fondo,
    color: colores.texto,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  completo: {
    color: colores.textoSuave,
    textAlign: 'center',
    marginVertical: 20,
  },
  sinDatos: {
    color: colores.textoSuave,
    textAlign: 'center',
  },
});
