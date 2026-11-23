# MS Techno Store

Aplicación de una tienda de productos gaming y tecnológicos. Está desarrollada con React, Vite y Firebase, y permite consultar el catálogo, administrar productos y gestionar un carrito de compras.

## Funcionalidades

- Página de inicio, catálogo, detalle de producto, contacto y páginas informativas.
- Búsqueda de productos por nombre mientras se escribe.
- Consulta de productos por categoría desde una ruta como `/TV` o `/celulares`.
- Paginación de tres productos por página en el catálogo general y en el panel. La página actual se conserva en el parámetro `?page=` de la URL.
- Carrito global mediante Context API. Permite agregar, quitar, incrementar, decrementar y vaciar productos. La cantidad no puede superar el stock disponible.
- Registro e inicio de sesión con Firebase Authentication.
- Panel protegido para usuarios con rol `admin`, con operaciones CRUD sobre Firestore.
- Validación de precio, stock e imagen al crear o editar productos; mensajes de carga, error y confirmación.
- Carga de imágenes de productos mediante ImgBB.
- Estilos responsivos con CSS Modules.

El formulario de contacto actualmente simula el envío: muestra una confirmación y limpia los campos, pero todavía no conecta con un servicio de correo.

## Tecnologías

- React y JavaScript
- Vite
- React Router
- Firebase Authentication y Cloud Firestore
- CSS Modules
- pnpm

## Requisitos previos

- Node.js
- pnpm
- Acceso a un proyecto de Firebase con Authentication y Cloud Firestore habilitados
- Una API key de ImgBB para subir imágenes desde el panel

## Instalación y ejecución

Cloná el repositorio e instalá sus dependencias:

```bash
git clone https://github.com/MigsaHub/ReactJSTalentTech.git
cd ReactJSTalentTech
pnpm install
```

Creá un archivo `.env.local` en la raíz del proyecto con la clave de ImgBB:

```env
VITE_IMGBB_API_KEY=tu_api_key_de_imgbb
```

Luego iniciá Vite:

```bash
pnpm dev
```

La configuración cliente de Firebase está en `src/firebase/config.js`. Para conectar otro proyecto, reemplazá esos datos por la configuración de su aplicación web y habilitá el proveedor de correo y contraseña en Firebase Authentication.

Las variables de Vite con prefijo `VITE_` se incluyen en el código que recibe el navegador; no deben contener secretos privados. Para producción, configurá `VITE_IMGBB_API_KEY` en las variables de entorno de Netlify y volvé a desplegar la aplicación.

## Firebase y roles

Los productos se guardan en la colección `productos nacionales`. Los datos de usuario se guardan en `usuarios`, usando el UID de Firebase Authentication como ID del documento.

Al registrarse, cada cuenta recibe el rol `usuario`. El panel está disponible en `/panel` únicamente para usuarios cuyo documento en `usuarios/{uid}` tenga el campo `rol` con valor `admin`. Asigná ese rol desde un entorno confiable de administración.

La protección de rutas en React controla el acceso a la interfaz. Las reglas de seguridad de Firestore también deben restringir las lecturas y escrituras según el rol; no alcanza con ocultar o proteger una página en el cliente.

## Rutas principales

| Ruta            | Contenido                                        |
| --------------- | ------------------------------------------------ |
| `/`             | Página de inicio                                 |
| `/products`     | Catálogo y búsqueda                              |
| `/products/:id` | Detalle de producto                              |
| `/:categoryId`  | Productos de una categoría                       |
| `/carrito`      | Carrito de compras                               |
| `/contacto`     | Formulario de contacto simulado                  |
| `/login`        | Inicio de sesión                                 |
| `/register`     | Registro                                         |
| `/panel`        | Administración de productos para administradores |

También hay páginas para términos y condiciones, privacidad, protección de datos y propiedad intelectual. El catálogo y el panel muestran tres resultados por página; la ruta por categoría actualmente presenta todos los resultados de esa categoría.

## Estructura del proyecto

```text
src/
├── components/
│   ├── common/       # Feedback y diálogos reutilizables
│   ├── context/      # Contextos de autenticación, carrito y búsqueda
│   ├── layout/       # Header, navegación, inicio y footer
│   ├── pages/        # Páginas y panel de administración
│   └── products/     # Catálogo, detalle, formularios y componente Pagination
├── firebase/         # Configuración de Firebase
├── hooks/            # Hook usePaginacion
└── services/         # Operaciones de productos y carga de imágenes
```

La búsqueda se comparte desde `components/context/SearchContext.jsx`. El componente visual del paginador está en `components/products/Pagination.jsx` y su lógica reutilizable en `hooks/usePaginacion.jsx`. Las imágenes de productos se guardan en ImgBB y Firestore conserva sus URL; no se cargan desde archivos locales del proyecto.

## Comandos disponibles

```bash
pnpm dev       # inicia el servidor de desarrollo
pnpm build     # genera la versión de producción en dist/
pnpm preview   # sirve localmente la versión compilada
pnpm lint      # ejecuta ESLint
```

## Despliegue

El proyecto está preparado para Netlify. El archivo `public/_redirects` redirige las rutas de la aplicación a `index.html`, lo que permite abrir directamente rutas internas como `/products` o `/panel`.

En Netlify, configurá `VITE_IMGBB_API_KEY` en las variables de entorno del sitio. El comando de compilación es `pnpm build` y el directorio publicado es `dist`. Cada cambio integrado en la rama conectada puede iniciar un nuevo despliegue.

## Estado conocido

- El carrito se mantiene en memoria mientras la aplicación está abierta; al recargar la página, se reinicia.
- La paginación se aplica al catálogo general y al panel, no a los resultados por categoría.
- `pnpm lint` puede reportar errores de Fast Refresh en los archivos de Context y una advertencia de dependencia en `AuthContext`. La compilación de producción se ejecuta con `pnpm build`.
