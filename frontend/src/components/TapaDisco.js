import { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';
import { colores } from '../estilos/colores';

export default function TapaDisco({ url, tamanio }) {
  const [fallo, setFallo] = useState(false);

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
