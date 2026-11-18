import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colores } from '../estilos/colores';
import { formatearPuntaje } from '../utils/formato';

// Los 19 puntajes posibles: del 1 al 10, de a medio punto.
const PUNTAJES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

// Selector de puntaje con un Picker (lista desplegable).
// Props:
//   valor    -> el puntaje elegido ahora (0 = ninguno todavía)
//   onCambiar -> función que recibe el puntaje que eligió el usuario
export default function PuntajeSelector({ valor, onCambiar }) {
  return (
    <View style={styles.caja}>
      <Picker
        selectedValue={valor}
        // En la web el Picker puede devolver el valor como texto ("7.5"),
        // por eso lo pasamos a número con Number().
        onValueChange={(valorElegido) => onCambiar(Number(valorElegido))}
        style={styles.picker}
        dropdownIconColor={colores.texto}
      >
        {/* Primera opción "vacía": valor 0 = todavía no eligió */}
        <Picker.Item label="Elegí un puntaje" value={0} />

        {/* Con .map() armamos una opción por cada puntaje */}
        {PUNTAJES.map((numero) => (
          <Picker.Item key={numero} label={formatearPuntaje(numero)} value={numero} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  caja: {
    backgroundColor: colores.fondo,
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 10,
    overflow: 'hidden', // para que el Picker respete las esquinas redondeadas
  },
  picker: {
    color: colores.texto,
    backgroundColor: colores.fondo,
    borderWidth: 0,
    padding: 12,
    fontSize: 15,
  },
});
