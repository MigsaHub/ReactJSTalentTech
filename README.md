# 🎮 Gaming Store Pro

Practica de React, enfocado en la creación de una tienda online de productos gaming y tecnológicos.

La aplicación permite visualizar un catálogo de productos, consultar el detalle de cada producto, navegar entre las diferentes secciones utilizando React Router. Aun no habilitado funcionalidad de carrito.

---

## 📋 Descripción

El proyecto fue desarrollado utilizando React y está orientado a la práctica de conceptos fundamentales del desarrollo de aplicaciones web modernas:

- Componentización
- Props
- Hooks
- Manejo de estado
- React Router
- Consumo de datos mediante `fetch`
- CSS Modules
- Renderizado dinámico
- Navegación SPA

Los productos se cargan desde un archivo JSON local utilizando `fetch` y `useEffect`, simulando el consumo de datos desde una API.

---

## ✨ Funcionalidades

### 🏠 Página de inicio

La página principal presenta:

- Información de la tienda.
- Descripción de Gaming Store Pro.
- Principales características del servicio.
- Header y navegación.
- Footer corporativo.

### 🛍️ Catálogo de productos

La sección `/productos` muestra los productos disponibles en formato de grid.

Cada producto incluye:

- Imagen
- Nombre
- Precio
- Stock
- Acceso al detalle del producto

Los productos son cargados desde:

```text
public/data/productos.json
```
Los datos del footer son cargados desde un archivo footerData.js, para una actualizacion sin tocar el componente y agregar mas datos a futuro, desde:

```text
src/assets/data/footerData.js
```
