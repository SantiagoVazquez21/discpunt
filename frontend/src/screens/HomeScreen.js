import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import DiscoCard from '../components/DiscoCard';
import Boton from '../components/Boton';
import { obtenerDiscos } from '../services/discosService';
import { colores } from '../estilos/colores';
import { mostrarAviso } from '../utils/avisos';

export default function HomeScreen({ navigation }) {
  const [discos, setDiscos] = useState([]);
  const [cargando, setCargando] = useState(true);

  // Estados de los filtros
  const [busqueda, setBusqueda] = useState('');
  const [orden, setOrden] = useState('mayor'); 

  const cargarDatos = async () => {
    try {
      setCargando(true);
      // El backend devuelve cada disco con su promedio ya calculado.
      const listaDiscos = await obtenerDiscos();
      setDiscos(listaDiscos);
    } catch (error) {
      mostrarAviso('Error', 'No se pudo conectar con el servidor');
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    // El evento 'focus' se dispara cada vez que esta pantalla vuelve a mostrarse
    const desuscribir = navigation.addListener('focus', cargarDatos);

    // Al salir de la pantalla dejamos de escuchar el evento.
    return desuscribir;
  }, [navigation]);

  // Filtro: buscador
  const textoBuscado = busqueda.trim().toLowerCase();
  const discosFiltrados = discos.filter(
    (disco) =>
      disco.titulo.toLowerCase().includes(textoBuscado) ||
      disco.banda.toLowerCase().includes(textoBuscado)
  );

  // Orden: por promedio
  const discosOrdenados = [...discosFiltrados].sort((a, b) => {
    if (a.promedio === null && b.promedio === null) return 0;
    if (a.promedio === null) return 1; // a va después
    if (b.promedio === null) return -1; // b va después

    if (orden === 'mayor') {
      return b.promedio - a.promedio; // de mayor a menor
    }
    return a.promedio - b.promedio; // de menor a mayor
  });

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.encabezadoLista}>
        <Text style={styles.subtitulo}>Mis discos</Text>
        <Boton titulo="+ Nuevo disco" onPress={() => navigation.navigate('DiscoForm')} />
      </View>

      {/* ----- Filtros ----- */}
      <TextInput
        style={styles.buscador}
        value={busqueda}
        onChangeText={setBusqueda}
        placeholder="Buscar por título o banda"
        placeholderTextColor={colores.textoSuave}
      />

      <View style={styles.filaOrden}>
        <View style={styles.botonMitad}>
          <Boton
            titulo="Mayor a menor"
            tipo={orden === 'mayor' ? 'primario' : 'secundario'}
            onPress={() => setOrden('mayor')}
          />
        </View>
        <View style={styles.botonMitad}>
          <Boton
            titulo="Menor a mayor"
            tipo={orden === 'menor' ? 'primario' : 'secundario'}
            onPress={() => setOrden('menor')}
          />
        </View>
      </View>

      {/* ----- Lista (renderizado condicional) ----- */}
      {cargando ? (
        <ActivityIndicator size="large" color={colores.primario} style={{ marginTop: 30 }} />
      ) : discos.length === 0 ? (
        <Text style={styles.sinDatos}>No cargaste ningún disco todavía</Text>
      ) : discosOrdenados.length === 0 ? (
        <Text style={styles.sinDatos}>Ningún disco coincide con la búsqueda</Text>
      ) : (
        discosOrdenados.map((disco) => (
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
  buscador: {
    backgroundColor: colores.fondo,
    color: colores.texto,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
  },
  filaOrden: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 10,
    marginBottom: 16,
  },
  botonMitad: {
    flex: 1, // los dos botones se reparten el ancho en partes iguales
  },
  sinDatos: {
    color: colores.textoSuave,
    textAlign: 'center',
    marginTop: 12,
  },
});
