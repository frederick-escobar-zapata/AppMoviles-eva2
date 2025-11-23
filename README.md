# 📱 Aplicación de Login - React Native con TypeScript

Esta es una aplicación de login desarrollada con **React Native**, **Expo** y **TypeScript** que implementa autenticación básica y navegación por tabs.
aca tengo las dos evalauciones , parte 1 y parte 2


--------------Evalaucion 1 ----------------
## 🚀 Características

- ✅ **Pantalla de Login** con validación de credenciales
- ✅ **Navegación con Expo Router** 
- ✅ **TypeScript** para tipado estático
- ✅ **Manejo de estado** con React Context
- ✅ **Tabs de navegación** (Home y Perfil)
- ✅ **Funciona en web y móvil**

## 🔐 Credenciales de Acceso

- **Email:** Cualquier email esto no esta válidado
- **Contraseña:** `1234` solo con esta contraseña

## 📁 Estructura del Proyecto

```
app/
├── _layout.tsx          # Layout principal
├── index.tsx            # Pantalla de Login
└── (tabs)/              # Grupo de tabs
    ├── _layout.tsx      # Layout de tabs
    ├── home.tsx         # Pantalla principal
    └── profile.tsx      # Pantalla de perfil
contexts/
└── UserContext.tsx      # Context para manejo de estado
```

## 🛠️ Instalación y Ejecución

1. **Instalar dependencias:**
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   ```bash
   npx expo start
   ```

3. **Abrir la aplicación:**
   - Escanea el código QR con Expo Go (móvil)
   - Presiona `w` para abrir en navegador web
   - Presiona `a` para abrir en emulador Android
   - Presiona `i` para abrir en simulador iOS

## 📱 Funcionalidades

### Login
- Validación de email (NO requerido)
- Validación de contraseña (debe ser "1234")
- Mensajes de error visuales
- Navegación automática después del login exitoso
- Manejo de estados entre vistas

### Navegación
- **Tab Home:** Pantalla de bienvenida,  con usuario logueado
- **Tab Perfil:** Muestra el email del usuario logueado

### Estado Global
- Utiliza React Context para compartir datos del usuario
- Manejo de estado con `useState` y `useContext`

## 🎥 Demo de la Aplicación Evaluacion 1

**[📺 Ver demostración en navegador](https://youtu.be/l9SIKcMTq68)**
**[📺 Ver demostración en telefono](https://youtube.com/shorts/-A1yolJuOPI)**

*Demostración de la aplicación de login funcionando en el navegador*

## 📦 Repositorio

**[🔗 Repositorio GitHub](https://github.com/frederick-escobar-zapata/AppMoviles-eva1)**

*Código fuente completo del proyecto*



--------------Evaluación 2 ----------------
## 🧪 Evaluación 2 – Aplicación de Lista de Tareas con Fotos y Ubicación

En la Evaluación 2 se extiende la app anterior agregando una pantalla de tareas asociadas al usuario logueado. Cada tarea puede tener foto, ubicación y estado de completado.

### 🚀 Características principales

- ✅ Lista de tareas por usuario
- ✅ Crear tareas con título
- ✅ Marcar tareas como completadas / no completadas
- ✅ Eliminar tareas
- ✅ Adjuntar foto a la tarea:
  - Desde **cámara**
  - Desde **galería**
- ✅ Ver un **icono de imagen** en la tarea si tiene foto
- ✅ Mostrar la imagen en un **modal** a pantalla ampliada
- ✅ Guardar **ubicación** (latitud / longitud) al crear la tarea
- ✅ Ver un **icono de ubicación** si la tarea tiene coordenadas
- ✅ Abrir la ubicación en **Google Maps** desde la tarea
- ✅ Guardar tareas en **AsyncStorage** separadas por usuario
- ✅ Componentes reutilizables:
  - `TaskInput` (input + iconos)
  - `TaskList` (renderizado de lista)
  - `TaskItem` (item con iconos)
  - `Title`
  - `ErrorMessage`

### 📁 Estructura relevante de Evaluación 2

```text

app/
└── (tabs)/
    ├── home.tsx          # Pantalla principal de tareas (crear, listar, fotos, ubicación)
    └── profile.tsx       # Perfil del usuario + logout
components/
├── task-item.tsx         # Item individual de tarea (toggle, borrar, foto, ubicación)
├── tasks/
│   ├── TaskInput.tsx     # Input + iconos (cámara, galería, agregar)
│   └── TaskList.tsx      # Lista de tareas (map de TaskItem)
└── ui/
    ├── title.tsx         # Componente de título reutilizable
    ├── ErrorMessage.tsx  # Mensajes de error reutilizables
    └── icon-symbol.tsx   # Wrapper de iconos (SF Symbols)
constants/
└── types.ts              # Definición de Task (id, title, completed, userEmail, photoUri, location)
```

### 📱 Flujo de la pantalla Home (Eval 2)

1. Muestra saludo con el email del usuario logueado.
2. Permite escribir una nueva tarea:
   - Icono de **cámara**: abre la cámara del sistema y asocia la foto a la próxima tarea.
   - Icono de **galería**: abre la galería y asocia la foto seleccionada.
   - Icono **“+”**: crea la tarea con título, foto (opcional) y ubicación (si los permisos lo permiten).
3. Lista de tareas:
   - Círculo para marcar la tarea como completada / no completada.
   - Título de la tarea.
   - Icono de **imagen** si tiene foto: abre un modal con la foto grande.
   - Icono de **ubicación** si tiene coordenadas: abre Google Maps en la posición guardada.
   - Icono de **papelera**: elimina la tarea.

### 💾 Persistencia y asociación por usuario

- Cada usuario (email) tiene su propio conjunto de tareas.
- Las tareas se guardan en AsyncStorage con claves del tipo:
  - `tasks_<email>`
- Al iniciar sesión con otro email, se cargan o inicializan las tareas correspondientes a ese usuario.

### 🎥 Demo de la Aplicación Evaluación 2

*(Link de Demo app:)*

- **[📺 Demo Eval 2 en teléfono](https://www.canva.com/design/DAG5iuG99WI/82xtUyxbYvrXhA2bwXPxYA/edit?utm_content=DAG5iuG99WI&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton)**


### 📦 Repositorio Evaluación 2

**[🔗 Repositorio GitHub Evaluación 2](https://github.com/frederick-escobar-zapata/AppMoviles-eva2)**

---

## 🧰 Tecnologías Utilizadas (ambas evaluaciones)

- **React Native** – Framework de desarrollo móvil
- **Expo** – Plataforma de desarrollo
- **TypeScript** – Tipado estático
- **Expo Router** – Navegación basada en archivos
- **React Context** – Manejo de estado global de usuario
- **AsyncStorage** – Persistencia local de tareas
- **expo-image-picker** – Cámara y galería
- **expo-location** – Ubicación del dispositivo

## 👨‍💻 Desarrollado por

**Bastian Ceron**    
**Gonzalo Croft**
**Frederick Escobar**  


## 🔐 Credenciales de Acceso

- **Email:** Cualquier email esto no esta válidado
- **Contraseña:** `1234` solo con esta contraseña

*Proyecto académico desarrollado con fines educativos*
