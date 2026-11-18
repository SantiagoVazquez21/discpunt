import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colores } from '../estilos/colores';
import { formatearPuntaje } from '../utils/formato';

const PUNTAJES = [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10];

export default function PuntajeSelector({ valor, onCambiar }) {
  return (
    <View style={styles.caja}>
      <Picker
        selectedValue={valor}
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
    borderRadius: 8,
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
