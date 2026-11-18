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
          // flex: 1 hace que cada pantalla ocupe exactamente el alto disponible.
          // Sin esto, en la WEB la pantalla crece con su contenido y el
          // ScrollView no tiene nada que scrollear (en el celular no pasa).
          cardStyle: { backgroundColor: colores.fondo, flex: 1 },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Discpunt' }} />
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
