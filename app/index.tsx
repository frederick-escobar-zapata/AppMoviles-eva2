import { router } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import { indexStyles } from "../components/styles/indexStyles";
import { useUser } from "../contexts/UserContext";

export default function LoginScreen() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { setUser } = useUser();

  const handleLogin = async () => {
    setErrorMessage(""); // Limpiar errores previos

    if (!email.trim()) {
      setErrorMessage("Por favor ingresa tu email");
      return;
    }

    if (!password.trim()) {
      setErrorMessage("Por favor ingresa tu contraseña");
      return;
    }
    if (password !== "1234") {
      setErrorMessage("Credenciales inválidas");
      return;
    }
    setIsLoading(true); // Simular carga
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      // esto es crucial para actualizar el contexto del usuario
      setUser({ email: email.trim() });

      // Navegar a la pantalla principal
      router.replace("/(tabs)/home");
    } catch (error) {
      setErrorMessage("Error al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };
  const handleForgotPassword = () => {
    Alert.alert("Recuperar Contraseña", "¿Deseas recuperar tu contraseña?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Recuperar",
        onPress: () => console.log("Recuperar contrasena"),
      },
    ]);
  };

  return (
    <SafeAreaView style={indexStyles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={indexStyles.KeyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={indexStyles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={indexStyles.header}>
            <View style={indexStyles.logoContainer}>
              <Text style={indexStyles.logoText}>Tonic</Text>
            </View>
            <Text style={indexStyles.welcomeText}>Bienvenido de nuevo</Text>
            <Text style={indexStyles.subtitle}>Inicia sesión</Text>
          </View>

          <View style={indexStyles.formContainer}>
            {errorMessage ? ( // Mostrar mensaje de error si existe
              <View style={indexStyles.errorContainer}>
                <Text style={indexStyles.errorText}>{errorMessage}</Text>
              </View>
            ) : null}
            {/* Comenzamos con los campos de ingreso de datos */}
            {/* Campo Email */}
            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Email</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="tonic@email.com"
                placeholderTextColor={"#9CA3AF"}
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                autoComplete="email"
              />
            </View>
            {/* Campo contrasena */}
            <View style={indexStyles.inputContainer}>
              <Text style={indexStyles.label}>Contraseña</Text>
              <TextInput
                style={indexStyles.input}
                placeholder="******"
                placeholderTextColor={"#9CA3AF"}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            {/* olvide contrasena */}
            <TouchableOpacity
              style={indexStyles.forgotPasswordContainer}
              onPress={handleForgotPassword}
            >
              <Text style={indexStyles.forgotPasswordText}>
                ¿Olvidaste tu contraseña?
              </Text>
            </TouchableOpacity>
            {/* boton de login */}
            <CustomButton
              title={isLoading ? "Cargando..." : "Iniciar Sesión"}
              onPress={handleLogin}
              disabled={isLoading}
              style={indexStyles.loginButton}
            />
            {/* separador */}
            <View style={indexStyles.separatorContainer}>
              <View style={indexStyles.separatorLine} />
              <Text style={indexStyles.separatorText}>O</Text>
              <View style={indexStyles.separatorLine} />
            </View>
            {/* boton de registro */}
            <TouchableOpacity
              style={indexStyles.registerButton}
              onPress={() => console.log("Navega a registro")}
            >
              <Text style={indexStyles.registerButtonText}>
                ¿No tienes una cuenta?{" "}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
