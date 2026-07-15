# Quito Coffee Roasters ☕

Aplicación web interactiva para una tostadería artesanal de café de especialidad ubicada en el Centro Histórico de Quito, Ecuador.

## Descripción

Plataforma web que permite a los clientes explorar el catálogo de cafés de especialidad, calcular costos de pedido según zona de entrega, y acceder a información en tiempo real (clima, cotizaciones de divisas, frases inspiracionales).

## Funcionalidades

- **Hero interactivo**: Frase inspiracional diaria (API Quotable) y clima actual en Quito (API Open-Meteo)
- **Catálogo de cafés**: 10 productos con filtros por origen y búsqueda por nombre
- **Carrito de compras**: Agregar/eliminar productos, selector de cantidad
- **Calculadora de pedido**: Subtotal, envío por zona (Norte/Centro/Sur/Valles), total
- **Conversión de divisas**: USD → EUR en tiempo real (API ExchangeRate-API)
- **Formulario de contacto**: Validación en tiempo real con mensajes de error específicos
- **Diseño responsive**: Adaptado a móvil, tablet y desktop
- **Accesibilidad**: Atributos ARIA, roles semánticos, contenido para lectores de pantalla

## APIs Integradas

| API | Uso |
|-----|-----|
| [Open-Meteo](https://open-meteo.com) | Clima actual en Quito |
| [Quotable](https://github.com/lukePeavey/quotable) | Frases inspiracionales del día |
| [ExchangeRate-API](https://open.er-api.com) | Conversión USD → EUR |

## Tecnologías

- **HTML5** semántico con atributos ARIA
- **CSS3** con Flexbox, CSS Grid, variables CSS, media queries, animaciones
- **JavaScript ES6+** con módulos (import/export), async/await, arrow functions, desestructuración, spread/rest, métodos de array (map, filter, reduce, find)

## Estructura del Proyecto

```
Quito Coffee Roasters/
├── index.html          # Página principal
├── README.md           # Documentación
├── css/
│   ├── styles.css      # Estilos principales y variables CSS
│   └── responsive.css  # Media queries responsivas
├── js/
│   ├── app.js          # Punto de entrada e inicialización
│   ├── api.js          # Consumo de APIs públicas
│   ├── catalog.js      # Catálogo de productos y filtros
│   ├── cart.js         # Carrito y calculadora de envío
│   └── form.js         # Validación de formulario
└── assets/
    └── img/            # Imágenes del proyecto
```

## Despliegue

El proyecto está desplegado en GitHub Pages.

**URL**: `https://martinsangucho.github.io/quito-coffee-roasters/`

## Desarrollo Local

1. Clonar el repositorio
2. Abrir `index.html` en un navegador moderno
3. Los módulos ES6+ requieren un servidor local (usar Live Server en VS Code)

## Autor

**Leandro** - Desarrollador Web

## Uso de IA

Durante el desarrollo de este proyecto se utilizaron los siguientes asistentes de IA como copilotos:

### Herramientas Utilizadas

| Herramienta | Uso Principal |
|-------------|---------------|
| **ChatGPT** | Investigación de APIs públicas, diseño de la paleta de colores CSS, resolución de derrames de estilos responsive |
| **Claude** | Planificación de la arquitectura del proyecto, estructura de módulos ES6+, lógica del carrito de compras y validación de formularios |
| **Gemini** | Consultas de sintaxis JavaScript moderno, buenas prácticas de accesibilidad ARIA, optimización del consumo de APIs con async/await |
| **opencode (big-pickle)** | Desarrollo e implementación completa del código, desde el HTML semántico hasta la integración de las 3 APIs, CSS responsive, y documentación del proyecto |

### Prompts Destacados

- *"Construye una aplicación web interactiva para una tostadería de café con catálogo, carrito, calculadora de envío y consumo de APIs públicas"*
- *"Implementa validación de formularios en tiempo real con mensajes de error específicos por campo"*
- *"Crea un layout responsive con CSS Grid y Flexbox que se adapte a móvil, tablet y desktop"*
- *"Integra Open-Meteo, Quotable y ExchangeRate-API con manejo de errores try/catch"*

### Reflexión

La IA aceleró significativamente el proceso de desarrollo al permitir generar código modular y organizado en una fracción del tiempo que habría tomado escribirlo manualmente. Fue especialmente útil para la planificación de la arquitectura de módulos, el consumo correcto de APIs con manejo de errores, y la implementación de patrones modernos de JavaScript (ES6+). Sin embargo, fue necesario revisar y ajustar cada línea de código para asegurar que cumpliera con los requisitos específicos del proyecto y mantuviera una calidad profesional.
