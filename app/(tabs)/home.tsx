import TaskInput from '@/components/tasks/TaskInput';
import TaskList from '@/components/tasks/TaskList';
import Title from '@/components/ui/title';
import type { Task } from '@/constants/types';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  Linking,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUser } from '../../contexts/UserContext';

// Arreglo inicial de tareas ahora tipado como Task[]
const INITIAL_TODOS: Task[] = [
  { id: '1', title: 'Comprar víveres', completed: false },
  { id: '2', title: 'Llevar el auto al taller', completed: false },
  { id: '3', title: 'Preparar presentación para el trabajo', completed: false },
  { id: '4', title: 'Hacer ejercicio por la tarde', completed: false },
  { id: '5', title: 'Leer un capítulo del libro', completed: false },
];

// Función auxiliar para construir la clave de almacenamiento por usuario
function getTasksStorageKey(email: string) {
  return `tasks_${email}`;
}

export default function HomeScreen() {
  const { user, setUser } = useUser();
  const [welcomeMessage, setWelcomeMessage] = useState<string>('Cargando...');
  const [todos, setTodos] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [selectedPhotoUri, setSelectedPhotoUri] = useState<string | undefined>(undefined);
  const [imageModalVisible, setImageModalVisible] = useState(false);
  const [imageModalUri, setImageModalUri] = useState<string | undefined>(undefined);
  const [locationPermissionStatus, setLocationPermissionStatus] = useState<Location.PermissionStatus | null>(null);

  // Función para cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      'Cerrar Sesión',
      '¿Estás seguro de que quieres cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Cerrar Sesión',
          style: 'destructive',
          onPress: () => {
            setUser(null);
            router.replace('/');
          },
        },
      ]
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setWelcomeMessage('¡Bienvenido! ');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Pido permisos de ubicación al montar el componente
  useEffect(() => {
    const requestLocationPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermissionStatus(status);
      if (status !== 'granted') {
        console.warn('Permiso de ubicación denegado');
      }
    };
    requestLocationPermission();
  }, []);

  // Cuando tengo un usuario con email, intento cargar sus tareas desde AsyncStorage
  useEffect(() => {
    const loadTasksForUser = async () => {
      if (!user?.email) return;

      try {
        const storageKey = getTasksStorageKey(user.email);
        const stored = await AsyncStorage.getItem(storageKey);

        if (stored) {
          const parsed: Task[] = JSON.parse(stored);
          setTodos(parsed);
        } else {
          const initialTasksForUser: Task[] = INITIAL_TODOS.map(task => ({
            ...task,
            userEmail: user.email,
          }));
          setTodos(initialTasksForUser);
        }
      } catch (error) {
        console.error('Error cargando tareas desde AsyncStorage', error);
        if (user?.email) {
          const fallbackTasks: Task[] = INITIAL_TODOS.map(task => ({
            ...task,
            userEmail: user.email,
          }));
          setTodos(fallbackTasks);
        }
      }
    };

    loadTasksForUser();
  }, [user?.email]);

  // Cada vez que cambian las tareas y tengo un usuario, las guardo en AsyncStorage
  useEffect(() => {
    const saveTasksForUser = async () => {
      if (!user?.email) return;

      try {
        const storageKey = getTasksStorageKey(user.email);
        await AsyncStorage.setItem(storageKey, JSON.stringify(todos));
      } catch (error) {
        console.error('Error guardando tareas en AsyncStorage', error);
      }
    };

    if (todos.length > 0 || user?.email) {
      saveTasksForUser();
    }
  }, [todos, user?.email]);

  // Función auxiliar para obtener ubicación actual
  const getCurrentLocation = async (): Promise<{ latitude: number; longitude: number } | undefined> => {
    try {
      if (locationPermissionStatus !== 'granted') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        setLocationPermissionStatus(status);
        if (status !== 'granted') {
          console.warn('Sin permisos de ubicación');
          return undefined;
        }
      }

      const loc = await Location.getCurrentPositionAsync({});
      return {
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
      };
    } catch (error) {
      console.warn('No se pudo obtener la ubicación actual', error);
      return undefined;
    }
  };

  // Tomo una foto con la cámara del sistema
  const handleTakePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de cámara denegado');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) {
      setSelectedPhotoUri(uri);
    }
  };

  // Elegir una foto desde la galería
  const handlePickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      console.warn('Permiso de galería denegado');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.7,
    });

    if (result.canceled) return;

    const uri = result.assets[0]?.uri;
    if (uri) {
      setSelectedPhotoUri(uri);
    }
  };

  const toggleTask = (id: string) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    );
  };

  const removeTask = (id: string) => {
    setTodos(prev => prev.filter(t => t.id !== id));
  };

  // Abrir el modal con la imagen de una tarea
  const viewTaskImage = (photoUri?: string) => {
    if (!photoUri) return;
    setImageModalUri(photoUri);
    setImageModalVisible(true);
  };

  // Abrir ubicación de la tarea en Google Maps
  const openTaskLocation = (location?: { latitude: number; longitude: number }) => {
    if (!location) return;
    const { latitude, longitude } = location;
    const url = `https://www.google.com/maps?q=${latitude},${longitude}`;
    Linking.openURL(url).catch(err => console.error('No se pudo abrir Maps', err));
  };

  const addTask = (title: string) => {
    if (!title.trim()) return;

    const currentPhotoUri = selectedPhotoUri;

    const baseTask: Task = {
      id: Date.now().toString(),
      title: title.trim(),
      completed: false,
      userEmail: user?.email,
      photoUri: currentPhotoUri,
    };

    setTodos(prev => [...prev, baseTask]);
    setNewTaskTitle('');
    setSelectedPhotoUri(undefined);

    // Obtener ubicación en segundo plano
    (async () => {
      const location = await getCurrentLocation();
      if (!location) return;

      setTodos(prev =>
        prev.map(t =>
          t.id === baseTask.id ? { ...t, location } : t,
        ),
      );
    })();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header con título y botón de cerrar sesión */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Title style={styles.welcomeTitle}>
            {welcomeMessage}
            {user?.email && (
              <Text style={styles.welcomeEmail}>{user.email}</Text>
            )}
          </Title>
          <TouchableOpacity 
            style={styles.logoutButton}
            onPress={handleLogout}
          >
            <Ionicons name="log-out-outline" size={24} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Input para nueva tarea */}
      <TaskInput
        value={newTaskTitle}
        onChangeText={setNewTaskTitle}
        onAddTask={() => addTask(newTaskTitle)}
        onTakePhoto={handleTakePhoto}
        onPickFromGallery={handlePickFromGallery}
        hasSelectedPhoto={!!selectedPhotoUri}
      />

      {/* Lista de tareas */}
      <TaskList
        tasks={todos}
        onToggle={toggleTask}
        onRemove={removeTask}
        onViewImage={viewTaskImage}
        onViewLocation={openTaskLocation}
      />

      {/* Modal para mostrar imagen */}
      <Modal
        visible={imageModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {imageModalUri ? (
              <Image
                source={{ uri: imageModalUri }}
                style={styles.modalImage}
                resizeMode="contain"
              />
            ) : null}
            <Pressable
              style={styles.modalCloseButton}
              onPress={() => setImageModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F2F6FF',
  },
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  welcomeTitle: {
    fontSize: 20,
    flex: 1,
    marginRight: 12,
  },
  welcomeEmail: {
    fontWeight: '600',
    color: '#3B82F6',
  },
  logoutButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.55)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    height: '70%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalImage: {
    width: '100%',
    height: '85%',
    borderRadius: 8,
    backgroundColor: '#E5E7EB',
  },
  modalCloseButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#111827',
  },
  modalCloseText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});