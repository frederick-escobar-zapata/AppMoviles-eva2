import { homeStyles as styles } from "@/components/styles/homeStyles";
import TaskItem from "@/components/task-item";
import Title from "@/components/ui/title";
import { Ionicons } from "@expo/vector-icons"; // <--- usar Ionicons
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "../../contexts/UserContext";

const INITIAL_TODOS = [
  { id: "1", title: "Comprar víveres", completed: false },
  { id: "2", title: "Llevar el auto al taller", completed: false },
  { id: "3", title: "Preparar presentación para el trabajo", completed: false },
  { id: "4", title: "Hacer ejercicio por la tarde", completed: false },
  { id: "5", title: "Leer un capítulo del libro", completed: false },
];

export default function HomeScreen() {
  const { user, setUser } = useUser();
  const [welcomeMessage, setWelcomeMessage] = useState<string>("Cargando...");
  const [todos, setTodos] = useState(INITIAL_TODOS);
  const [newTaskTitle, setNewTaskTitle] = useState<string>(""); // <- NUEVO ESTADO

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage("¡Bienvenido! ");
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const toggleTask = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  };

  const addTask = (title: string) => {
    if (!title.trim()) return;
    const newTask = {
      id: (todos.length + 1).toString(),
      title: title.trim(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTask]);
    setNewTaskTitle(""); // limpiar input
  };
  const handleLogout = () => {
    Alert.alert("Cerrar sesión", "¿Estás seguro de que deseas cerrar sesión?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Cerrar sesión",
        style: "destructive",
        onPress: () => {
          // Lógica para cerrar sesión
          setUser(null);
          router.replace("/"); // Redirigir a la pantalla de login
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Title style={styles.welcomeTitle}>
            {welcomeMessage}
            {user?.email && (
              <Title style={styles.welcomeEmail}>{user.email}</Title>
            )}
            </Title>
            <TouchableOpacity
            style={styles.logoutButton}
            onPress={handleLogout}
            >
          <Ionicons name="log-out-outline" size={24} color={'#6B7280'}/>
            </TouchableOpacity>
        </View>
      </View>

      {/* INPUT PARA NUEVA TAREA */}
      <View style={styles.newTaskContainer}>
        <TextInput
          style={styles.newTaskInput}
          placeholder="Escribe una nueva tarea..."
          value={newTaskTitle}
          onChangeText={setNewTaskTitle}
        />
        <TouchableOpacity
          style={styles.addIconButton}
          onPress={() => addTask(newTaskTitle)}
        >
          {/* Icono + confiable con Ionicons */}
          <Ionicons name="add-circle" size={28} color="#3B82F6" />
        </TouchableOpacity>
      </View>

      {/* LISTA DE TAREAS */}
      {todos.map((todo) => (
        <TaskItem
          key={todo.id}
          task={todo}
          onToggle={() => toggleTask(todo.id)}
          onRemove={() => removeTask(todo.id)}
        />
      ))}
    </SafeAreaView>
  );
}