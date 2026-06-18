# Pastelería Dulce Encanto 🧁

[![GitHub](https://img.shields.io/badge/GitHub-LillianaU/ejemplo-5D4037?style=flat&logo=github)](https://github.com/LillianaU/ejemplo)
[![HTML5](https://img.shields.io/badge/HTML5-E8A0BF?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-FFB6C1?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-D4A574?style=flat&logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Font Awesome](https://img.shields.io/badge/Font_Awesome-6.5-528DD7?style=flat&logo=fontawesome&logoColor=white)](https://fontawesome.com/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=flat&logo=greensock&logoColor=white)](https://gsap.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-b5838d?style=flat)](LICENSE)

Sitio web moderno desarrollado para **Pastelería Dulce Encanto**, una pastelería artesanal ubicada en **Medellín, Colombia**. Diseñado con una estética pastel, animaciones suaves, efecto parallax, tipografía fluida y experiencia de usuario intuitiva.

## Características

- ✨ Pantalla de carga animada con pastelito
- 🎯 Efecto parallax en secciones hero, especiales y testimonios
- 🍰 Elementos flotantes 3D con animación de caída (héroe y footer)
- 🌸 Elementos decorativos flotantes en sección especiales (brillos, flores, corazones)
- 🎬 Animaciones bidireccionales al hacer scroll (aparecen al bajar, se desvanecen al subir)
- 🖼️ **Modal de producto** con galería de imágenes (3 fotos por producto)
- 💰 **Precio dinámico** que cambia según sabor, tamaño y extras seleccionados
- 🎨 **Font Awesome** — íconos vectoriales en lugar de emojis
- 🌀 **GSAP** — animaciones de entrada profesionales en el hero
- 🌈 **Fondo animado** con gradiente en movimiento en sección especiales
- 📝 Formulario de pedidos con validación en tiempo real
- 🗺️ Mapa interactivo de Google Maps
- 📐 Tipografía fluida con `clamp()` — sin saltos bruscos en media queries
- 📱 Diseño responsive con 3 breakpoints (1024px, 768px, 480px)
- ✉️ Integración con redes sociales (Facebook, Instagram, WhatsApp, TikTok)

## Tecnologías

- **HTML5** — Estructura semántica y accesible
- **CSS3** — Animaciones, Flexbox, CSS Grid, tipografía fluida con `clamp()`, media queries organizadas
- **JavaScript** — Loading screen, parallax scroll con `requestAnimationFrame`, animaciones de scroll, validación de formularios, modal interactivo
- **Font Awesome 6.5** — Íconos vectoriales en secciones de especiales, contacto, formulario
- **Animate.css 4.1** — Animaciones CSS para hover effects
- **GSAP 3.12** — Timeline de entrada del hero con efectos profesionales
- **Google Fonts** — Playfair Display (títulos), Poppins (cuerpo), Great Vibes (marca)
- **Google Maps** — Mapa embebido de la ubicación en El Poblado, Medellín

## Estructura del Proyecto

```
├── index.html         # Página principal con todas las secciones
├── styles.css         # Estilos completos
├── script.js          # Lógica JS completa
├── README.md          # Este archivo
├── LICENSE            # Licencia MIT
└── .gitignore         # Archivos ignorados
```

## Secciones del Sitio

| Sección | Descripción |
|---|---|
| **Inicio** | Hero con parallax, bienvenida y CTA al catálogo |
| **Catálogo** | Grid de 9 productos artesanales. Al hacer clic se abre un modal con galería de imágenes, selector de sabor, tamaño, extras y precio dinámico |
| **Especiales** | Pastel de bodas con fondo animado (gradiente en movimiento), elementos flotantes decorativos y cotización |
| **Pedidos** | Formulario con validación en tiempo real (nombre, email, teléfono, tipo, descripción, fecha) |
| **Testimonios** | Opiniones de clientes con diseño de tarjetas y parallax de fondo |
| **Contacto** | Información de contacto, horarios y mapa embebido de El Poblado, Medellín |

## Uso

### Abrir localmente

```bash
git clone https://github.com/LillianaU/ejemplo.git
cd ejemplo
# Abre index.html en tu navegador
```

O simplemente abre `index.html` directamente desde el explorador de archivos.

### Recomendaciones

- Para desarrollo, usa un servidor local como [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) de VS Code para evitar problemas CORS con las fuentes de Google.
- No se requieren dependencias ni instalación de paquetes.

## Personalización

### Productos del catálogo
Edita el grid `.catalog-grid` en `index.html` para agregar, quitar o modificar productos.

### Precios y variaciones
En `script.js`, dentro del objeto `productData`, cada producto tiene:
- `basePrice` — precio base
- `variations` — sabores con precio adicional
- `sizes` — tamaños con precio adicional
- `extras` — complementos con precio adicional

### Imágenes de galería
Cada producto tiene un array `images` con 3 URLs de Unsplash del mismo producto con diferentes encuadres.

### Parallax
Ajusta `data-speed` en las secciones `.parallax-section` (0.1–1.0).

### Elementos flotantes
Modifica `createFloatingScene()` en `script.js` para cambiar cantidad, emojis o velocidad.

## Licencia

Distribuido bajo la licencia MIT. Consulta el archivo `LICENSE` para más información.

---

<p align="center">Hecho con ❤️ por <a href="https://github.com/EduarJIM">EduarJIM</a> — Pastelería Dulce Encanto · Medellín, Colombia</p>
