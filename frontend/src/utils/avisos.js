import { Alert, Platform } from 'react-native';

// ¿Por qué existe este archivo?
// En la web (Expo web / Snack), Alert.alert de React Native NO muestra nada.
// Entonces, si la app corre en web usamos las ventanitas del navegador
// (window.alert y window.confirm), y si corre en el celular usamos Alert.
// Platform.OS nos dice dónde está corriendo: 'web', 'android' o 'ios'.

// Muestra un mensaje con un solo botón "OK".
export const mostrarAviso = (titulo, mensaje) => {
  if (Platform.OS === 'web') {
    window.alert(`${titulo}\n\n${mensaje}`);
  } else {
    Alert.alert(titulo, mensaje);
  }
};

// Pregunta "¿seguro?" y, solo si el usuario acepta, ejecuta alConfirmar.
export const confirmar = (titulo, mensaje, alConfirmar) => {
  if (Platform.OS === 'web') {
    // window.confirm devuelve true si tocó "Aceptar" y false si tocó "Cancelar"
    if (window.confirm(`${titulo}\n\n${mensaje}`)) {
      alConfirmar();
    }
  } else {
    Alert.alert(titulo, mensaje, [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: alConfirmar },
    ]);
  }
};
