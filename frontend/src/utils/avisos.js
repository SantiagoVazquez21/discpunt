import { Alert, Platform } from 'react-native';

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
