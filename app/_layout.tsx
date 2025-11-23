<<<<<<< HEAD
=======
// En este archivo defino la estructura principal de navegación con un Stack.
// Aquí registro la pantalla de login (index) y el grupo de tabs (home y perfil).
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
>>>>>>> 07769ea1611b4ae311bc5a1dfc40eaacaf64fd0d
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { UserProvider } from '../contexts/UserContext';

export default function RootLayout() {
<<<<<<< HEAD
=======
  // Detecto si el dispositivo está en modo claro u oscuro
  const colorScheme = useColorScheme();

>>>>>>> 07769ea1611b4ae311bc5a1dfc40eaacaf64fd0d
  return (
    // Envuelo toda la app con el UserProvider para compartir el usuario logueado
    <UserProvider>
<<<<<<< HEAD
=======
      {/* Aplico un tema oscuro o claro según la configuración del sistema */}
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        {/* Stack principal de navegación */}
>>>>>>> 07769ea1611b4ae311bc5a1dfc40eaacaf64fd0d
        <Stack>
          {/* Pantalla inicial: login (index.tsx), sin header */}
          <Stack.Screen name="index" options={{ headerShown: false }} />
<<<<<<< HEAD
=======
          {/* Grupo de tabs (carpeta (tabs)), también sin header */}
>>>>>>> 07769ea1611b4ae311bc5a1dfc40eaacaf64fd0d
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
        {/* Configuro la barra de estado del dispositivo */}
        <StatusBar style="auto" />
    </UserProvider>
  );
}
