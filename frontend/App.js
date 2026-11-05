import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from './src/screens/HomeScreen';
import DiscoFormScreen from './src/screens/DiscoFormScreen';
import DiscoDetalleScreen from './src/screens/DiscoDetalleScreen';
import { colores } from './src/estilos/colores';

// Stack Navigator: las pantallas se "apilan" una arriba de la otra.
// navigate() pone una pantalla arriba y goBack() saca la de arriba.
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator
        initialRouteName="Home"
        // Estilos que comparten todas las pantallas (barra de arriba oscura)
        screenOptions={{
          headerStyle: { backgroundColor: colores.fondo },
          headerTintColor: colores.texto,
          cardStyle: { backgroundColor: colores.fondo },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Mis Discos' }} />
        <Stack.Screen name="DiscoForm" component={DiscoFormScreen} options={{ title: 'Disco' }} />
        <Stack.Screen
          name="DiscoDetalle"
          component={DiscoDetalleScreen}
          options={{ title: 'Detalle del disco' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
