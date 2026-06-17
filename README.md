# Lumora

**Ilumina tu espacio con elegancia** — Tienda online de iluminación y decoración, 100% frontend.

## Descripción

Lumora es una tienda virtual especializada en lámparas y accesorios de iluminación. Este proyecto demuestra la construcción de una aplicación web completa utilizando únicamente tecnologías frontend: HTML5, CSS3 y JavaScript vanilla, sin dependencias de frameworks ni backend.

## Funcionalidades

-   Landing page con productos destacados y banner promocional
-   Catálogo completo con 14 productos en 4 categorías
-   Filtros por categoría y búsqueda en tiempo real
-   Página de detalle con galería de imágenes y selector de cantidad
-   Carrito de compras persistente con localStorage
-   Formulario de contacto con validación en JavaScript
-   Diseño responsive (mobile, tablet, desktop)
-   Navegación entre todas las páginas con header y footer compartidos

## Estructura del proyecto

```
lumora/
├── index.html              # Página de inicio / Landing
├── pages/
│   ├── catalog.html         # Catálogo de productos
│   ├── product.html         # Detalle de producto
│   ├── cart.html            # Carrito de compras
│   ├── about.html           # Sobre Lumora
│   └── contact.html         # Contacto
├── css/
│   └── style.css            # Estilos globales
├── js/
│   ├── data.js              # Datos de productos (14 artículos)
│   ├── main.js              # Header, footer y utilidades del carrito
│   ├── catalog.js           # Filtros y búsqueda
│   ├── product.js           # Galería y agregar al carrito
│   ├── cart.js              # Gestión del carrito
│   └── contact.js           # Validación de formulario
├── img/                     # Imágenes (placeholder)
├── .gitignore
└── README.md
```

## Tecnologías

-   **HTML5** — Estructura semántica y meta tags
-   **CSS3** — Custom properties, Flexbox, Grid, animaciones, media queries
-   **JavaScript (Vanilla)** — Manipulación del DOM, localStorage, eventos
-   **Google Fonts** — Playfair Display + Inter
-   **Picsum.photos** — Imágenes de placeholder

## Cómo ejecutar

1.  Abre el archivo `index.html` directamente en tu navegador, o
2.  Usa un servidor local (Live Server, http-server, etc.):
    ```bash
    npx serve .
    ```
    o
    ```bash
    npx live-server .
    ```

No requiere instalación de dependencias ni configuración adicional.

## Diseño

-   **Paleta de colores:** Dorado oscuro (#B8860B), crema cálido (#FDF6EC), espresso (#2C1810), terracota (#C8674B)
-   **Tipografía:** Playfair Display para títulos, Inter para texto corporal
-   **Responsive:** 3 breakpoints (900px, 600px, 400px) para tablet, mobile y mobile pequeño
