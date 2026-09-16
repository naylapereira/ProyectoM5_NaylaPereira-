# 🐾 Mundo Patitas — AI Driven E-Commerce

Proyecto Integrador M5 — Especialización Frontend.

## 📖 Descripción y contexto

**Mundo Patitas** es una Single Page Application de e-commerce desarrollada para el caso planteado por **Patagonix Tech**, una software factory que necesita construir para un cliente del sector retail una plataforma de venta online moderna, mantenible y basada en servicios administrados.

La aplicación ofrece dos experiencias diferenciadas:

- **Customer:** puede registrarse, navegar productos, utilizar el carrito, realizar un checkout simulado y consultar sus órdenes.
- **Admin:** puede administrar el catálogo de productos, subir imágenes y gestionar las órdenes realizadas por los clientes.

El proyecto integra React con Firebase, AWS S3 y Vercel, priorizando separación de responsabilidades, seguridad, tipado y una interfaz responsive.

## 🚀 Producción

**Aplicación:** https://pi-m5.vercel.app

**Repositorio:** https://github.com/naylapereira/ProyectoM5_NaylaPereira-

---

## ✨ Funcionalidades

### 👤 Customer

- Registro con email y contraseña.
- Autenticación con email/password o Google.
- Logout y persistencia de sesión.
- Catálogo almacenado en Firestore.
- Filtrado por categoría.
- Búsqueda por nombre con debounce.
- Detalle individual de productos.
- Carrito con Context API + `useReducer`.
- Agregar, eliminar y modificar cantidades.
- Control de cantidades según stock.
- Cálculo automático del total.
- Persistencia local del carrito.
- Checkout con simulación de pago.
- Creación de órdenes en Firestore.
- Historial de órdenes.
- Detalle de órdenes anteriores.

### 🛠️ Admin

- Panel con layout diferenciado.
- Rutas protegidas según rol.
- Creación de productos.
- Edición de productos.
- Eliminación de productos.
- Upload de imágenes a AWS S3.
- Búsqueda de productos para administración.
- Visualización de todas las órdenes.
- Filtrado de órdenes por estado.
- Modificación del estado de las órdenes.

Los estados disponibles son:

- `pending`
- `processing`
- `completed`
- `cancelled`

---

## 🧰 Tech Stack

### Frontend

- React 18
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Context API
- useReducer

### Backend y servicios

- Firebase Authentication
- Cloud Firestore
- Firebase Admin SDK
- AWS S3
- AWS SDK
- Vercel Serverless Functions

### Testing

- Vitest
- React Testing Library
- jsdom

### Deployment y versionado

- Vercel
- GitHub

---

## 🏗️ Arquitectura

Se eligió una arquitectura orientada a **features**, complementada con carpetas compartidas para responsabilidades globales.

```text
src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── cart/
│   ├── orders/
│   └── products/
├── hooks/
├── layouts/
├── pages/
├── services/
├── test/
├── types/
└── utils/

api/
├── firebaseAdmin.ts
└── generateUploadUrl.ts
```

### Responsabilidades

- `app/`: configuración global, providers y routing.
- `components/`: componentes reutilizables compartidos.
- `features/`: lógica agrupada según el dominio del negocio.
- `hooks/`: hooks reutilizables globales.
- `layouts/`: estructuras visuales de customer y admin.
- `pages/`: pantallas asociadas a las rutas.
- `services/`: comunicación con servicios externos.
- `test/`: configuración y utilidades de testing.
- `types/`: tipos compartidos de TypeScript.
- `utils/`: funciones auxiliares.
- `api/`: Vercel Serverless Functions.

Esta organización permite localizar las funcionalidades principales sin necesidad de recorrer toda la aplicación y mantiene separadas las responsabilidades.

---

## 🧠 Decisiones arquitectónicas

### ¿Por qué Context API + useReducer?

El carrito posee múltiples operaciones relacionadas sobre un mismo estado: agregar productos, eliminarlos, actualizar cantidades y vaciarlo.

Se utilizó `useReducer` para centralizar estas transiciones mediante acciones predecibles y mantener la lógica separada de los componentes visuales.

Context API permite compartir ese estado entre las diferentes pantallas sin prop drilling.

El contexto de autenticación y el contexto del carrito se mantuvieron separados porque representan responsabilidades diferentes.

### ¿Por qué Firebase?

Firebase Authentication permite administrar la identidad y persistencia de sesión sin implementar un servidor de autenticación propio.

Firestore se utiliza para almacenar perfiles, productos y órdenes, además de permitir definir reglas de seguridad según el usuario autenticado y su rol.

### ¿Por qué AWS S3?

Las imágenes son archivos que no necesitan almacenarse dentro de los documentos de Firestore.

S3 permite almacenarlas como objetos y guardar únicamente su URL dentro del producto.

Para evitar exponer las credenciales AWS se utilizan presigned URLs generadas desde una Vercel Serverless Function.

### ¿Por qué una arquitectura por features?

Auth, productos, carrito y órdenes representan dominios diferentes de la aplicación.

Agrupar el código relacionado con cada funcionalidad facilita localizarlo, modificarlo, testearlo y explicar la arquitectura.

---

## 🔐 Autenticación y autorización

Firebase Authentication administra la identidad del usuario.

La aplicación soporta:

- email y contraseña;
- Google Sign-In.

Además, cada usuario posee un documento en Firestore con uno de los siguientes roles:

```text
customer
admin
```

El registro público crea exclusivamente usuarios con rol `customer`.

El rol `admin` se asigna de manera controlada y no puede seleccionarse desde el formulario público.

Existen dos niveles de protección:

1. Los guards de React controlan la navegación y experiencia del usuario.
2. Las reglas de Firestore controlan qué operaciones están autorizadas sobre los datos.

Por lo tanto, ocultar una ruta en el frontend no constituye por sí mismo una medida de seguridad.

---

## 🛒 Carrito

El carrito se administra globalmente mediante:

```text
Context API
    ↓
useReducer
    ↓
cartReducer
```

El reducer maneja las acciones necesarias para:

- agregar;
- eliminar;
- actualizar cantidad;
- limpiar.

Además, se controla que las cantidades no superen el stock disponible.

El carrito se persiste en `localStorage`, permitiendo conservar su estado al recargar la aplicación.

Una posible mejora futura sería sincronizar también este estado con Firestore para conservar el carrito del usuario entre distintos dispositivos.

---

## 📦 Checkout, órdenes y stock

El checkout permite revisar el carrito y confirmar una compra mediante una simulación de pago.

Al confirmar se ejecuta una transacción de Firestore que:

1. verifica nuevamente el stock;
2. actualiza el stock de los productos;
3. crea la orden.

De esta manera, las operaciones relacionadas se realizan de forma atómica dentro de Firestore.

Las órdenes poseen los estados:

```text
pending
processing
completed
cancelled
```

El customer puede consultar sus propias órdenes y sus detalles.

El admin puede consultar todas las órdenes y modificar su estado.

---

## 🖼️ Upload seguro de imágenes con AWS S3

Las credenciales de AWS nunca son enviadas al navegador.

El flujo implementado es:

```text
Admin selecciona una imagen
          ↓
React obtiene el Firebase ID Token
          ↓
POST /api/generateUploadUrl
          ↓
Vercel Serverless Function
          ↓
Valida Firebase ID Token
          ↓
Verifica rol admin en Firestore
          ↓
Genera presigned URL temporal
          ↓
Frontend recibe la URL
          ↓
PUT directo desde navegador a S3
          ↓
URL de la imagen guardada en el producto
```

La presigned URL autoriza temporalmente una operación específica sin entregar al navegador las credenciales utilizadas para firmarla.

El usuario IAM utilizado por la aplicación tiene permisos limitados para realizar uploads dentro de `products/*`.

---

## 🔒 Seguridad

Se aplicaron las siguientes medidas:

- `.env` excluido mediante `.gitignore`.
- `.env.example` sin valores reales.
- Variables sensibles fuera del código fuente.
- Credenciales AWS exclusivamente en el backend serverless.
- Validación server-side del Firebase ID Token.
- Verificación server-side del rol antes de generar presigned URLs.
- Registro público limitado a `customer`.
- Rutas administrativas protegidas según rol.
- Reglas de Firestore según usuario y rol.
- Customers limitados al acceso de sus propias órdenes.
- Cambios de estado de órdenes restringidos al administrador.
- Permisos IAM de AWS limitados a las operaciones necesarias.

Las variables `VITE_FIREBASE_*` son utilizadas por el cliente para configurar Firebase.

Las credenciales privadas de AWS y Firebase Admin **no utilizan el prefijo `VITE_`** y permanecen únicamente en las Vercel Serverless Functions.

---

# ⚙️ Instalación y configuración

## 1. Clonar el proyecto

```bash
git clone https://github.com/naylapereira/ProyectoM5_NaylaPereira-.git
cd ProyectoM5_NaylaPereira-
```

## 2. Instalar dependencias

```bash
npm install
```

## 3. Configurar Firebase

Crear un proyecto en Firebase y habilitar:

- Authentication;
- Email/Password;
- Google;
- Cloud Firestore.

Crear la configuración web de Firebase y obtener las variables necesarias.

También se necesitan credenciales de Firebase Admin para las funciones serverless.

## 4. Configurar AWS S3

Crear:

1. un bucket S3;
2. un usuario IAM con permisos limitados;
3. una configuración CORS que permita los orígenes utilizados por la aplicación.

Las credenciales IAM deben utilizarse exclusivamente desde el backend serverless.

## 5. Configurar variables de entorno

Crear un archivo `.env` basándose en `.env.example`.

```env
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

FIREBASE_PROJECT_ID=
FIREBASE_CLIENT_EMAIL=
FIREBASE_PRIVATE_KEY=

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_REGION=
AWS_S3_BUCKET=
```

Nunca deben colocarse valores reales en `.env.example`.

## 6. Ejecutar el proyecto

```bash
npm run dev
```

## 7. Ejecutar tests

```bash
npm test
```

## 8. Generar build

```bash
npm run build
```

---

## ☁️ Configuración en Vercel

El proyecto utiliza Vercel tanto para el hosting del frontend como para las Serverless Functions.

Para configurar producción:

1. conectar el repositorio de GitHub con Vercel;
2. agregar las variables de entorno del proyecto;
3. realizar el deployment;
4. agregar el dominio de producción a los dominios autorizados de Firebase Authentication;
5. agregar el dominio de producción a la configuración CORS de S3;
6. verificar los flujos de customer y admin en producción.

Las variables del frontend utilizan el prefijo `VITE_`.

Las variables de AWS y Firebase Admin se utilizan únicamente desde las Serverless Functions y no llevan ese prefijo.

---

# ✅ Testing

Se utilizó **Vitest + React Testing Library** para probar lógica y comportamiento sin depender de servicios externos reales.

La estrategia contempla:

- wrapper reutilizable de providers;
- tests aislados de custom hooks con `renderHook`;
- tests de `useCart`;
- tests de `useAuth`;
- tests de las acciones del `cartReducer`;
- tests de integración de flujos de usuario;
- mocks de Firebase;
- mocks de servicios externos;
- casos edge identificados durante el desarrollo.

Los tests se pueden ejecutar con:

```bash
npm test
```

También se puede validar el proyecto mediante:

```bash
npm run lint
npm run build
```

---

# 🤖 Bitácora de uso de Inteligencia Artificial

La IA se utilizó como asistente para analizar alternativas, revisar implementaciones, generar casos de prueba y comprender errores.

Las soluciones propuestas fueron revisadas y probadas antes de incorporarlas al proyecto.

| Tipo de uso | Prompt / consulta realizada | Aprendizaje obtenido | Decisión o resultado |
|---|---|---|---|
| Planificación | ¿Cómo organizar un e-commerce React con autenticación, catálogo, carrito, órdenes y administración manteniendo responsabilidades separadas? | Una arquitectura orientada a features facilita ubicar la lógica relacionada con cada dominio. | Se organizaron `auth`, `products`, `cart` y `orders` como features y se mantuvieron carpetas compartidas para responsabilidades globales. |
| Validación técnica | ¿Conviene manejar el carrito con `useState` o con Context API + `useReducer`? | `useReducer` permite centralizar múltiples transiciones del mismo estado y mantenerlas predecibles y testeables. | Se implementó un `CartContext` separado de autenticación y un reducer con acciones específicas. |
| Code review | ¿Qué problemas pueden existir en la implementación del carrito respecto al stock y las cantidades? | Validar únicamente desde el botón de la interfaz no protege el estado si una acción llega al reducer desde otro lugar. | Se agregó control de stock dentro de la lógica del reducer/helpers y se revisaron los estados de botones y mensajes. |
| Generación de tests | ¿Cómo testear `useCart`, `useAuth` y `cartReducer` sin depender de Firebase real? | Los hooks pueden probarse aisladamente con `renderHook`, los reducers como funciones puras y los servicios externos mediante mocks. | Se incorporaron tests unitarios y de integración evitando llamadas reales a servicios externos. |
| Seguridad | ¿Cómo subir imágenes desde React a AWS S3 sin exponer `AWS_ACCESS_KEY_ID` y `AWS_SECRET_ACCESS_KEY`? | El frontend no necesita conocer las credenciales si una función confiable genera una presigned URL temporal. | Se implementó `/api/generateUploadUrl`, con credenciales AWS únicamente del lado serverless. |
| Validación de seguridad | ¿Es suficiente proteger `/admin` con React Router? | Los guards del frontend mejoran la UX pero pueden ser manipulados desde el navegador; la autorización real también debe existir sobre los datos. | Se implementaron reglas de Firestore por usuario y rol y verificación server-side del rol para S3. |
| Resolución de problemas | El frontend envía el Firebase ID Token pero `/api/generateUploadUrl` devuelve `401` únicamente en producción. ¿Cómo aislar el origen? | Revisar Network permitió comprobar que el token sí llegaba; los logs serverless mostraron que el fallo ocurría durante su verificación y no en el frontend. | Se investigó el backend en lugar de eliminar la validación de seguridad. |
| Resolución de problemas | Los logs de Vercel muestran `ERR_REQUIRE_ESM` dentro de dependencias de Firebase Admin. ¿Qué significa y cómo resolverlo sin eliminar la autenticación? | El error provenía de una incompatibilidad ESM/CommonJS entre la versión de Firebase Admin y dependencias utilizadas en el runtime. | Se utilizaron imports modulares y una versión compatible de Firebase Admin. Luego se validaron lint, build y nuevamente el upload en producción. |

La IA no se utilizó únicamente para generar código. También permitió comparar alternativas, detectar problemas, entender integraciones y tomar decisiones técnicas que posteriormente fueron verificadas mediante pruebas.

---

# 🧩 Principales desafíos y aprendizajes

## Autenticación y roles

Firebase Authentication determina quién es el usuario, mientras que Firestore complementa esa identidad almacenando el rol.

Esto permitió comprender la diferencia entre **autenticación** y **autorización**.

## Estado global

El carrito permitió aplicar Context API y `useReducer` a un caso con múltiples acciones y entender por qué separar contextos facilita el mantenimiento y testing.

## Consistencia durante una compra

El checkout requiere modificar stock y crear una orden.

El uso de una transacción de Firestore permitió agrupar esas operaciones y evitar actualizaciones parciales.

## Seguridad

Una de las decisiones principales fue no considerar los guards del frontend como única protección.

Las operaciones sensibles también están restringidas mediante reglas de Firestore y validaciones server-side.

## Integración AWS S3

La implementación de presigned URLs permitió comprender cómo autorizar temporalmente un upload sin compartir credenciales AWS con el navegador.

## Debugging en producción

Uno de los desafíos principales apareció al integrar Firebase Admin con la Serverless Function en Vercel.

Aunque inicialmente la respuesta HTTP parecía indicar un problema con el token, la inspección de Network confirmó que el frontend lo enviaba correctamente.

Los logs del servidor permitieron encontrar una incompatibilidad entre dependencias relacionada con ESM/CommonJS.

Esto permitió resolver el problema manteniendo la validación de seguridad y comprobar posteriormente el upload completo a S3 en producción.

---

# 📱 UI y experiencia de usuario

La interfaz sigue un enfoque mobile-first y cuenta con:

- diseño responsive;
- layouts diferenciados por rol;
- estados de carga;
- estados vacíos;
- mensajes de error;
- feedback de acciones;
- validaciones de formularios;
- componentes reutilizables y tipados.

---

# 🔮 Posibles mejoras futuras

Algunas extensiones posibles serían:

- sincronizar el carrito con Firestore entre dispositivos;
- dashboard de analytics;
- paginación del catálogo;
- reviews y ratings;
- optimización adicional del bundle.

Estas funcionalidades no forman parte de los requerimientos obligatorios del proyecto.

---

# 👩‍💻 Autora

**Nayla Pereira**

Proyecto Integrador M5 — Especialización Frontend