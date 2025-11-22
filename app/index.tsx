// Esta es la pantalla de inicio de sesión de la aplicación.
// Aquí el usuario ingresa su email y contraseña, valido la contraseña y si es correcta navego a las pestañas.
import { router } from 'expo-router';
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    TextInput,
    View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomButton from '../components/CustomButton';
import ErrorMessage from '../components/ui/ErrorMessage';
import { useUser } from '../contexts/UserContext';

export default function LoginScreen() {
  // Estado para guardar el email que escribe el usuario
  const [email, setEmail] = useState<string>('');
  // Estado para guardar la contraseña que escribe el usuario
  const [password, setPassword] = useState<string>('');
  // Estado para mostrar mensajes de error en la pantalla
  const [errorMessage, setErrorMessage] = useState<string>('');
  // Obtengo la función para guardar el usuario en el contexto global
  const { setUser } = useUser();

  // Función que se ejecuta cuando el usuario presiona el botón "Iniciar Sesión"
  const handleLogin = () => {
    // Limpio cualquier error previo
    setErrorMessage('');
    
    // Valido que el email no esté vacío
    if (!email.trim()) {
      setErrorMessage('Por favor ingresa tu email');
      return;
    }

    // Valido que la contraseña sea exactamente 1234
    if (password !== '1234') {
      setErrorMessage('Credenciales inválidas');
      return;
    }

    // Si todo está correcto, guardo el usuario en el contexto (solo email en este caso)
    setUser({ email: email.trim() });

    // Redirijo a la vista de tabs, comenzando en la pestaña Home
    router.replace('/(tabs)/home');
  };

  return (
    // SafeAreaView para respetar las zonas seguras en iOS y Android
    <SafeAreaView style={styles.container}>
      <View style={styles.loginContainer}>
        {/* Título principal de la pantalla de login */}
        <Text style={styles.title}>Iniciar Sesión</Text>
        
        {/* Si hay un mensaje de error, lo muestro dentro de un recuadro rojo claro */}
        {errorMessage ? (
          <ErrorMessage message={errorMessage} />
        ) : null}
        
        {/* Campo de texto para el email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu email"
            value={email}
            // Actualizo el estado de email mientras el usuario escribe
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Campo de texto para la contraseña */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            placeholder="Ingresa tu contraseña"
            value={password}
            // Actualizo el estado de contraseña mientras el usuario escribe
            onChangeText={setPassword}
            // Modo seguro para ocultar lo que se escribe
            secureTextEntry={true}
          />
        </View>

        {/* Botón reutilizable que dispara la función de login */}
        <CustomButton 
          title="Iniciar Sesión" 
          onPress={handleLogin} 
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // Contenedor principal de la pantalla de login
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  // Contenedor interno centrado verticalmente con padding horizontal
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  // Estilo del título "Iniciar Sesión"
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  // Contenedor para cada input (email y password)
  inputContainer: {
    marginBottom: 20,
  },
  // Etiqueta encima de cada input
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#555',
  },
  // Estilo base de los TextInput
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  // Contenedor visual para el mensaje de error
  errorContainer: {
    backgroundColor: '#ffebee',
    borderColor: '#f44336',
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    marginBottom: 20,
  },
  // Texto del mensaje de error
  errorText: {
    color: '#f44336',
    fontSize: 14,
    textAlign: 'center',
    fontWeight: '500',
  },
});
