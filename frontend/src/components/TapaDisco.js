import { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

// Muestra la foto del disco. Si no hay link, o el link no carga,
// muestra un cuadrado gris con una nota musical en su lugar.
// Props:
//   url    -> link de la imagen (puede venir vacío)
//   tamanio -> ancho y alto en píxeles (las imágenes en React Native necesitan tamaño)
export default function TapaDisco({ url, tamanio }) {
  const [fallo, setFallo] = useState(false);

  // Si cambia el link (por ejemplo, mientras lo escribimos en el formulario),
  // volvemos a intentar cargarlo.
  useEffect(() => {
    setFallo(false);
  }, [url]);

  if (!url || fallo) {
    return (
      <View style={[styles.vacia, { width: tamanio, height: tamanio }]}>
        <Text style={{ fontSize: tamanio / 3, color: colores.textoSuave }}>♪</Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: url }}
      style={[styles.imagen, { width: tamanio, height: tamanio }]}
      onError={() => setFallo(true)} // si el link está roto, mostramos el cuadrado gris
    />
  );
}

const styles = StyleSheet.create({
  imagen: {
    borderRadius: 8,
  },
  vacia: {
    borderRadius: 8,
    backgroundColor: colores.borde,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
