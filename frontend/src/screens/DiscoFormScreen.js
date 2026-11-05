import { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, Alert, StyleSheet } from 'react-native';
import Boton from '../components/Boton';
import TapaDisco from '../components/TapaDisco';
import { crearDisco, actualizarDisco } from '../services/discosService';
import { colores } from '../estilos/colores';

// Esta pantalla sirve para CREAR y para EDITAR un disco.
// - Si llegamos desde el Home: no recibe parámetros -> crea un disco nuevo.
// - Si llegamos desde el detalle con "Editar": recibe el disco -> lo edita.
export default function DiscoFormScreen({ navigation, route }) {
  const discoEditando = route.params ? route.params.disco : null;
  // Cuántas canciones ya tiene cargadas (para no dejar bajar la cantidad por debajo de eso)
  const cancionesCargadas = route.params ? route.params.cancionesCargadas : 0;

  // Si estamos editando, los campos arrancan con los datos del disco.
  // TextInput trabaja con texto, por eso la cantidad se pasa a String.
  const [titulo, setTitulo] = useState(discoEditando ? discoEditando.titulo : '');
  const [banda, setBanda] = useState(discoEditando ? discoEditando.banda : '');
  const [cantidad, setCantidad] = useState(
    discoEditando ? String(discoEditando.cantidad_canciones) : ''
  );
  const [fotoUrl, setFotoUrl] = useState(
    discoEditando && discoEditando.foto_url ? discoEditando.foto_url : ''
  );
  const [guardando, setGuardando] = useState(false);

  // Cambiamos el título de arriba según si creamos o editamos.
  useEffect(() => {
    navigation.setOptions({ title: discoEditando ? 'Editar disco' : 'Nuevo disco' });
  }, [navigation, discoEditando]);

  // Devuelve un mensaje de error, o null si todo está bien.
  const validar = () => {
    if (titulo.trim() === '') {
      return 'El título del disco es obligatorio';
    }
    if (banda.trim() === '') {
      return 'El nombre de la banda es obligatorio';
    }

    const numero = Number(cantidad);
    // Number.isInteger descarta letras ("abc" da NaN) y decimales (2.5)
    if (!Number.isInteger(numero) || numero <= 0) {
      return 'La cantidad de canciones tiene que ser un número entero mayor a 0';
    }
    if (numero < cancionesCargadas) {
      return `Ya cargaste ${cancionesCargadas} canciones, la cantidad no puede ser menor`;
    }

    if (fotoUrl.trim() !== '' && !fotoUrl.trim().startsWith('http')) {
      return 'El link de la foto tiene que empezar con http:// o https://';
    }
    return null;
  };

  const guardar = async () => {
    const error = validar();
    if (error) {
      Alert.alert('Revisá los datos', error);
      return; // cortamos acá: no se manda nada al backend
    }

    // Armamos el objeto con los nombres de columna de la base de datos.
    const datos = {
      titulo: titulo.trim(),
      banda: banda.trim(),
      cantidad_canciones: Number(cantidad),
      foto_url: fotoUrl.trim() === '' ? null : fotoUrl.trim(),
    };

    try {
      setGuardando(true);
      if (discoEditando) {
        await actualizarDisco(discoEditando.id, datos);
        navigation.goBack(); // volvemos al detalle del disco
      } else {
        const nuevo = await crearDisco(datos);
        // "replace" cambia esta pantalla por el detalle del disco nuevo,
        // así podemos empezar a cargar sus canciones enseguida.
        // (Si usáramos navigate, al volver atrás aparecería otra vez el formulario).
        navigation.replace('DiscoDetalle', { discoId: nuevo.id });
      }
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar el disco');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <ScrollView
      style={styles.pantalla}
      contentContainerStyle={styles.contenido}
      keyboardShouldPersistTaps="handled"
    >
      {/* Vista previa de la tapa: se actualiza mientras escribimos el link */}
      <View style={styles.preview}>
        <TapaDisco url={fotoUrl.trim()} tamanio={160} />
      </View>

      <Text style={styles.label}>Título del disco *</Text>
      <TextInput
        style={styles.input}
        value={titulo}
        onChangeText={setTitulo}
        placeholder="Ej: Abbey Road"
        placeholderTextColor={colores.textoSuave}
      />

      <Text style={styles.label}>Banda *</Text>
      <TextInput
        style={styles.input}
        value={banda}
        onChangeText={setBanda}
        placeholder="Ej: The Beatles"
        placeholderTextColor={colores.textoSuave}
      />

      <Text style={styles.label}>Cantidad de canciones *</Text>
      <TextInput
        style={styles.input}
        value={cantidad}
        onChangeText={setCantidad}
        placeholder="Ej: 17"
        placeholderTextColor={colores.textoSuave}
        keyboardType="numeric" // en el celular abre el teclado numérico
      />

      <Text style={styles.label}>Link de la foto del disco</Text>
      <TextInput
        style={styles.input}
        value={fotoUrl}
        onChangeText={setFotoUrl}
        placeholder="https://..."
        placeholderTextColor={colores.textoSuave}
        autoCapitalize="none"
        autoCorrect={false}
      />

      <View style={styles.botones}>
        <Boton
          titulo={guardando ? 'Guardando...' : 'Guardar'}
          onPress={guardar}
          desactivado={guardando} // evita que se guarde dos veces si tocan rápido
        />
      </View>
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
  preview: {
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    color: colores.textoSuave,
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: colores.tarjeta,
    color: colores.texto,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    padding: 12,
    fontSize: 15,
  },
  botones: {
    marginTop: 24,
  },
});
